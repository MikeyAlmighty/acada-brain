import { Injectable } from "@nestjs/common";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { ConfigService } from "@nestjs/config";
import { MediaType } from "./types";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ONE_HOUR } from "common/constants/time";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Learner } from "src/learners/learner.entity";
import { Repository } from "typeorm";
import { Lecturer } from "src/lecturers/lecturer.entity";

@Injectable()
export class ContentService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow("AWS_S3_REGION"),
    credentials: {
      accessKeyId: this.configService.getOrThrow("AWS_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.getOrThrow("AWS_SECRET_ACCESS_KEY"),
    },
  });

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Learner) private learnerRepository: Repository<Learner>,
    @InjectRepository(Lecturer)
    private lecturerRepository: Repository<Lecturer>,
  ) {}

  @OnEvent("user.image.upload")
  async uploadUserImage(payload: {
    userId: string;
    image: Express.Multer.File;
    isLecturer: boolean;
  }) {
    const bucketName = this.configService.get<string>("AWS_S3_BUCKET_NAME");
    const folderLocation = `profile-pictures/${payload.userId}.png`;

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: bucketName,
        Key: folderLocation,
        Body: payload.image.buffer,
        ACL: "public-read",
      },
    });

    await upload.done();

    const imgUrl = await this.getSignedImageUrl(
      payload.userId,
      MediaType.IMAGE,
    );

    // Update User Entity
    if (payload.isLecturer) {
      await this.lecturerRepository.update(payload.userId, { imgUrl });
    } else {
      await this.learnerRepository.update(payload.userId, { imgUrl });
    }
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
