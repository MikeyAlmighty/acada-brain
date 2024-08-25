import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./user.entity";
import { LocalStrategy } from "./strategies/local.strategy";

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
  providers: [UsersService, LocalStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
