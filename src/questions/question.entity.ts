// import { Optional } from "@nestjs/common";
import { Lesson } from "src/lessons/lesson.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "questions" })
export class Question {
  @PrimaryColumn()
  id: number;

  @Column()
  question: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => Lesson, (lesson) => lesson.questions)
  lesson: Lesson;
}
