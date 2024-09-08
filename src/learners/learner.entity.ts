import {
  Column,
  CreateDateColumn,
  Entity,
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
}
