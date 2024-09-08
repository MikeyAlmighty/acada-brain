import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { CreateLearnerDto } from "src/learners/dto/create-learner.dto";
import { CreateLecturerDto } from "src/lecturers/dto/create-lecturer.dto";
import { LocalGuard } from "./guards/local.guard";
import { AuthService } from "./auth.service";

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
  @UseGuards(LocalGuard)
  async login(
    @Body()
    body: {
      username: string;
      password: string;
      role: "lecturer" | "learner";
    },
  ) {
    console.log("hit");
    const { username, password, role } = body;
    console.log("body: ", body);
    return this.authService.login(username, password, role);
  }
}
