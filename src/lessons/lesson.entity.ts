import { Course } from "src/courses/course.entity";
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
  courseId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column()
  releaseDate: number;

  /*
   * Each Lesson will belong to one Course
   */
  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;

  /*
   * Each Lesson will have multiple questions
   */
  @OneToMany(() => Question, (question) => question.lessonId)
  questions: Question[];
}
