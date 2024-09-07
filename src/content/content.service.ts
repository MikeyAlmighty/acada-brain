import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { MediaType } from "./types";

@Injectable()
export class ContentService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow("AWS_S3_REGION"),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(mediaType: MediaType, fileName: string, file: Buffer) {
    console.log("fileName: ", fileName);
    const folderLocation =
      mediaType === MediaType.IMAGE
        ? `profile-pictures/${fileName}`
        : `content/${fileName}`;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: "acadabrain-uploads",
        Key: folderLocation,
        Body: file,
        ACL: "public-read",
      }),
    );
  }

  async getProfilePicture(key: string) {
    try {
      return `https://acadabrain-uploads.s3.eu-north-1.amazonaws.com/profile-pictures/${key}.png`;
    } catch (error) {
      console.error("Error downloading profile picture from S3", error);
      throw new InternalServerErrorException("Could not download file from S3");
    }
  }
}
