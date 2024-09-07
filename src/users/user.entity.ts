import { Lesson } from "src/lessons/lesson.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Unique,
} from "typeorm";

@Entity({ name: "users" })
@Unique(["username"])
export class User {
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

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  /*
   * Each Lesson can have multiple users
   */
  @OneToMany(() => Lesson, (lesson) => lesson.user)
  lessons: Lesson[];
}
