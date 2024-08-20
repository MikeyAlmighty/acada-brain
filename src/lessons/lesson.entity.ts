import { Question } from "src/questions/question.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  createdAt: number;

  /*
   * Each Lesson will have multiple questions
   */
  @OneToMany(() => Question, (question) => question.lessonId)
  question: Question[];
}
