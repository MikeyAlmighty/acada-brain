import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./user.entity";
import { LocalStrategy } from "src/auth/strategies/local.strategy";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { ContentService } from "src/content/content.service";

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    Repository<User>,
    JwtModule.register({
      global: true,
      secret: "super-secret",
      signOptions: {
        expiresIn: "1h",
      },
    }),
  ],
  providers: [UsersService, ContentService, LocalStrategy, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
