import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import { Avatar } from "./Avatar";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  email: string;

  // TODO: Add eager load
  @OneToOne(() => Avatar, { cascade: true })
  @JoinColumn({ name: "avatar_id" })
  avatar: Promise<Avatar>;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
