import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: Add not null constraint
  @Column()
  name: string;

  // TODO: Add not null constraint
  // TODO: Add unique constraint
  @Column()
  email: string;
}
