import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lesson } from "../lessons/lesson.entity";
import { User } from "src/users/user.entity";

@Entity("course")
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: new Date() })
  createdAt: Date;

  /*
   * Each Course will have multiple Lessons
   */
  @OneToMany(() => Lesson, (lesson) => lesson.courseId)
  lessons: Lesson[];

  /*
   * Many courses can belong to a single User
   */
  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
