import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
} from "typeorm";

@Entity({ name: "lecturers" })
@Unique(["username"])
export class Lecturer {
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

  @Column({ default: "lecturer" })
  role: string;

  @Column()
  phoneNumber: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}