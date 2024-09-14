import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { Learner } from "src/learners/learner.entity";
import { Question } from "./question.entity";
import { Lecturer } from "src/lecturers/lecturer.entity";

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

  @ManyToMany(() => Learner, (learner) => learner.lesson)
  @JoinTable()
  learners: Learner[];

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.lessons)
  lecturer: Lecturer;
}
