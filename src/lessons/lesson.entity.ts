import { User } from "src/users/user.entity";
import { Question } from "src/questions/question.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "lessons" })
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  releaseDate: Date;

  /*
   * Many Lessons can belong to a single User
   */
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  /*
   * Each Lesson will have multiple questions
   */
  @OneToMany(() => Question, (question) => question.lesson)
  questions: Question[];
}
