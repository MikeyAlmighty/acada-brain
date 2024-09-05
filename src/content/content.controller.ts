import {
  Body,
  Controller,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { ContentService } from "./content.service";
import { Response } from "express";

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.contentService.upload(file.originalname, file.buffer);
  }

  @Post("/download")
  async downloadFile(@Body() data: { userId: number }, @Res() res: Response) {
    console.log("userId: ", data);
    const fileStream = await this.contentService.download(
      data.userId.toString(),
    );

    res.set({
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename=${data.userId}`,
    });

    fileStream.pipe(res);
  }
}
