import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { CreateLearnerDto } from "src/learners/dto/create-learner.dto";
import { CreateLecturerDto } from "src/lecturers/dto/create-lecturer.dto";
import { AuthService } from "./auth.service";
import { RolesGuard } from "./guards/role.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup/lecturer")
  @UseInterceptors(FileInterceptor("image"))
  signUpLecturer(
    @UploadedFile() image: Express.Multer.File,
    @Body() createLecturerDto: CreateLecturerDto,
  ) {
    return this.authService.signUpLecturer(createLecturerDto, image);
  }

  @Post("signup/learner")
  @UseInterceptors(FileInterceptor("image"))
  signUpLearner(
    @UploadedFile() image: Express.Multer.File,
    @Body() createLearnerDto: CreateLearnerDto,
  ) {
    return this.authService.signUpLearner(createLearnerDto, image);
  }

  @Post("login")
  @UseGuards(RolesGuard)
  async login(
    @Body()
    body: {
      username: string;
      password: string;
      role: "lecturer" | "learner";
    },
  ) {
    const { username, password, role } = body;
    return this.authService.login(username, password, role);
  }
}
