import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index
} from "typeorm";

import { Avatar } from "./Avatar";

// TODO: Add created_at, updated_at

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @OneToOne(() => Avatar, { cascade: true })
  @JoinColumn({ name: "avatar_id" })
  avatar: Avatar;
}
