import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  // DB Teardown
  cleanDB() {
    return this.$transaction([
      this.lesson.deleteMany(),
      this.course.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
