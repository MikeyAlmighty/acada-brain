import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { Learner } from "src/learners/learner.entity";
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

  @Column({ nullable: true, length: 500 })
  videoUrl: string;

  @Column({ type: "timestamp" })
  releaseDate: Date;

  /*
   * Each Lesson will have multiple questions
   */
  @OneToMany(() => Question, (question) => question.lesson)
  questions: Question[];

  /*
   * Each Lesson will have multiple learners
   */
  @OneToMany(() => Learner, (learner) => learner.lesson)
  learners: Learner[];
}
