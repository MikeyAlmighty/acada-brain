import { hash, verify } from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignInAuthDto } from './dto';

const ERROR_PRISMA_UNIQUE_FIELD_CONSTRAINT = 'P2002';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup({ firstName, lastName, email, password }: AuthDto) {
    const newPasswordHash = await hash(password);
    try {
      const user = await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          hash: newPasswordHash,
        },
        // TODO: transformers (Robots in disguise)
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === ERROR_PRISMA_UNIQUE_FIELD_CONSTRAINT) {
          throw new ForbiddenException(
            `User with email, ${email}, already exists.`,
          );
        }
      }
      throw error;
    }
  }

  async signin({ email, password }: SignInAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      throw new ForbiddenException(
        'Username/password was incorrect, please try again.',
      );

    const isCorrectPassword = await verify(user.hash, password);
    if (!isCorrectPassword)
      throw new ForbiddenException(
        'Username/password was incorrect, please try again.',
      );

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return {
      access_token: token,
    };
  }
}
