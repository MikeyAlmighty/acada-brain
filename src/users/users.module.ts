import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
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
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
