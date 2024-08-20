import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("question")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
