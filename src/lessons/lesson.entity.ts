import { User } from "src/users/user.entity";
import { Question } from "src/questions/question.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.lessons, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  /*
   * Each Lesson will have multiple questions
   */
  @OneToMany(() => Question, (question) => question.lesson)
  questions: Question[];
}
