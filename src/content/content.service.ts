import { Injectable } from "@nestjs/common";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { MediaType } from "./types";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ONE_HOUR } from "common/constants/time";

@Injectable()
export class ContentService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow("AWS_S3_REGION"),
    credentials: {
      accessKeyId: this.configService.getOrThrow("AWS_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.getOrThrow("AWS_SECRET_ACCESS_KEY"),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(mediaType: MediaType, key: string, file: Buffer) {
    const bucketName = this.configService.get<string>("AWS_S3_BUCKET_NAME");
    const folderLocation =
      mediaType === MediaType.IMAGE
        ? `profile-pictures/${key}`
        : `content/${key}`;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: folderLocation,
        Body: file,
        ACL: "public-read",
      }),
    );
  }

  async getSignedImageUrl(key: string, mediaType: MediaType): Promise<string> {
    const bucketName = this.configService.get<string>("AWS_S3_BUCKET_NAME");
    const folderLocation =
      mediaType === MediaType.IMAGE
        ? `profile-pictures/${key}.png`
        : `content/${key}.mp4`;
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: folderLocation,
    });

    try {
      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: ONE_HOUR,
      });
      return signedUrl;
    } catch (err) {
      throw new Error(`Failed to generate signed URL: ${err.message}`);
    }
  }
}
