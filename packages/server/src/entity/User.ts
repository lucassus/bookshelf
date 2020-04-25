import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index,
  BaseEntity
} from "typeorm";

import { Avatar } from "./Avatar";

// TODO: Add created_at, updated_at

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "avatar_id" })
  avatar: Avatar;
}
