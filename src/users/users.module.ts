import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User]), Repository<User>],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
