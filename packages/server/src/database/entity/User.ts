import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";

import { Avatar } from "./Avatar";
import { BookCopy } from "./BookCopy";

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

  @OneToOne(() => Avatar, { eager: true })
  @JoinColumn({ name: "avatar_id" })
  avatar: Avatar;

  @Column({ name: "avatar_id" })
  avatarId: number;

  @OneToMany(() => BookCopy, (bookCopy) => bookCopy.owner)
  ownedBookCopies: Promise<BookCopy[]>;

  @OneToMany(() => BookCopy, (bookCopy) => bookCopy.borrower)
  borrowedBookCopies: Promise<BookCopy[]>;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
