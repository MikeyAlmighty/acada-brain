import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LocalGuard } from "src/auth/guards/local.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";

@Controller({ path: "users" })
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("signup")
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post("login")
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findUserById(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.findUserById(id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  deleteUser(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    this.userService.deleteUser(id);
  }
}
