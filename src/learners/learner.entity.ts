import { Lecturer } from "src/lecturers/lecturer.entity";
import { Lesson } from "src/lessons/lesson.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from "typeorm";

@Entity({ name: "learners" })
@Unique(["username"])
export class Learner {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column({ nullable: true, length: 500 })
  imgUrl: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column({ default: "learner" })
  role: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  /*
   * A Learner can have Many Lecturers
   *
   */
  @ManyToOne(() => Lecturer, (lecturer) => lecturer.learners, {
    onDelete: "CASCADE",
  })
  lecturer: Lecturer;

  @ManyToMany(() => Lesson, (lesson) => lesson.learners)
  lesson: Lesson[];
}
