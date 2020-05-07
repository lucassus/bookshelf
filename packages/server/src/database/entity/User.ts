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

  @Column({ default: "" })
  info: string;

  @OneToOne(() => Avatar, { cascade: true, eager: true })
  @JoinColumn({ name: "avatar_id" })
  avatar: Avatar;

  @Column({ name: "avatar_id" })
  avatarId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
