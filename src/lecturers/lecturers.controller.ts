import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from "@nestjs/common";
import { LecturersService } from "./lecturers.service";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { UpdateLecturerDto } from "./dto/update-lecturer.dto";

@Controller("lecturers")
export class LecturersController {
  constructor(private lecturerService: LecturersService) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  getLecturerById(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.lecturerService.findLecturerById(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async updateLecturer(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateLecturerDto: UpdateLecturerDto,
  ) {
    await this.lecturerService.updateLecturer(id, updateLecturerDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  deleteLecturer(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    this.lecturerService.deleteLecturer(id);
  }
}
