import {
  Controller,
  FileTypeValidator,
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

  @Post("upload/image")
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: "image/png" }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.contentService.upload(
      MediaType.IMAGE,
      file.originalname,
      file.buffer,
    );
  }

  @Post("upload/video")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: "image/png" }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.contentService.upload(
      MediaType.VIDEO,
      file.originalname,
      file.buffer,
    );
  }
}
