import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lesson } from "../lessons/lesson.entity";
import { User } from "src/users/user.entity";

@Entity({ name: "courses" })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  /*
   * Each Course will have multiple Lessons
   */
  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  /*
   * Many courses can belong to a single User
   */
  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
