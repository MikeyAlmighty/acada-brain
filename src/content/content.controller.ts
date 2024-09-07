import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { ContentService } from "./content.service";
import { MediaType } from "./types";

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post("upload/:mediaType")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @Param("mediaType") mediaType: MediaType,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: "image/png" }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.contentService.upload(mediaType, file.originalname, file.buffer);
  }
}
