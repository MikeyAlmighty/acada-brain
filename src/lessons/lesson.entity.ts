import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { Question } from "./question.entity";

@Entity({ name: "lessons" })
export class Lesson {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  releaseDate: Date;

  /*
   * Each Lesson will have multiple questions
   */
  @OneToMany(() => Question, (question) => question.lesson)
  questions: Question[];
}
