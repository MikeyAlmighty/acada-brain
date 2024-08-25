import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: UsersService) {
    super();
  }

  validate(username: string, password: string) {
    const user = this.authService.validateUser({
      username,
      password,
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
