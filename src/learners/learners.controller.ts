import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Put,
} from "@nestjs/common";

import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { LearnersService } from "./learners.service";
import { UpdateLearnerDto } from "./dto/update-learner.dto";

@Controller({ path: "learners" })
export class LearnersController {
  constructor(private learnerService: LearnersService) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  getLearnerById(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.learnerService.findLearnerById(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async updateLearner(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateLearnerDto: UpdateLearnerDto,
  ) {
    await this.learnerService.updateLearner(id, updateLearnerDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  deleteLearner(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    this.learnerService.deleteLearner(id);
  }
}