import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("question")
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lessonId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  createdAt: number;
}
