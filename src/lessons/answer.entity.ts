import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Answer {
  @PrimaryColumn()
  id: string;

  @Column()
  option: string;

  @Column()
  isCorrect: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
