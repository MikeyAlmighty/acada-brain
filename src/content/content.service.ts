import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
  GetObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { Stream } from "stream";

@Injectable()
export class ContentService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow("AWS_S3_REGION"),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: "acadabrain-uploads",
        Key: fileName,
        Body: file,
      }),
    );
  }

  async download(key: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: "acadabrain-uploads",
        Key: `${key}.png`,
      });
      const response: GetObjectCommandOutput =
        await this.s3Client.send(command);
      return response.Body as Stream;
    } catch (error) {
      console.error("Error downloading file from S3", error);
      throw new InternalServerErrorException("Could not download file from S3");
    }
  }
}
