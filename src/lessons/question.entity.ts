import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { Lesson } from "src/lessons/lesson.entity";
import { Answer } from "./answer.entity";

@Entity({ name: "questions" })
export class Question {
  @PrimaryColumn()
  id: string;

  @Column()
  question: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => Lesson, (lesson) => lesson.questions)
  lesson: Lesson;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
