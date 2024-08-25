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
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginDto } from "./dto/login.dto";

@Controller({ path: "users" })
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("signup")
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.validateUser(loginDto);
  }

  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Get(":id")
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
