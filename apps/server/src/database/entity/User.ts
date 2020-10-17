import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";

import { Avatar } from "./Avatar";
import { Book } from "./Book";
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

  @Column({ name: "password_hash" })
  passwordHash: string;

  @Column({ name: "is_admin", nullable: false, default: false })
  isAdmin: boolean;

  @OneToMany(() => BookCopy, (bookCopy) => bookCopy.owner)
  ownedBookCopies: Promise<BookCopy[]>;

  @OneToMany(() => BookCopy, (bookCopy) => bookCopy.borrower)
  borrowedBookCopies: Promise<BookCopy[]>;

  @ManyToMany(() => Book)
  @JoinTable({
    name: "users_favourite_books",
    joinColumn: { name: "user_id" },
    inverseJoinColumn: { name: "book_id" }
  })
  favouriteBooks: Promise<Book[]>;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
