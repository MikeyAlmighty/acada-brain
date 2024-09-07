import { Lesson } from "src/lessons/lesson.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity({ name: "users" })
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  imgUrl: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  /*
   * Each Lesson can have multiple users
   */
  @OneToMany(() => Lesson, (lesson) => lesson.user)
  lessons: Lesson[];
}
