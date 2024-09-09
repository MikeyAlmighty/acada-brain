import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { CreateLearnerDto } from "src/learners/dto/create-learner.dto";
import { CreateLecturerDto } from "src/lecturers/dto/create-lecturer.dto";
import { AuthService } from "./auth.service";
import { RolesGuard } from "./guards/role.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup/lecturer")
  signUpLecturer(@Body() createLecturerDto: CreateLecturerDto) {
    return this.authService.signUpLecturer(createLecturerDto);
  }

  @Post("signup/learner")
  signUpLearner(@Body() createLearnerDto: CreateLearnerDto) {
    return this.authService.signUpLearner(createLearnerDto);
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
