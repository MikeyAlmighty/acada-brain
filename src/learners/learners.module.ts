import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ContentService } from "src/content/content.service";
import { Learner } from "./learner.entity";
import { LearnersService } from "./learners.service";
import { LearnersController } from "./learners.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Learner]), Repository<Learner>],
  providers: [LearnersService, ContentService],
  controllers: [LearnersController],
})
export class LearnersModule {}
