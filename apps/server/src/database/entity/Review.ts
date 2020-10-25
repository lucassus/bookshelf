import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Book } from "./Book";
import { User } from "./User";

@Entity({ name: "reviews" })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.copies)
  @JoinColumn({ name: "book_id" })
  book: Promise<Book>;

  @Column({ name: "book_id" })
  bookId: number;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: "author_id" })
  author: Promise<User>;

  @Column({ name: "author_id" })
  authorId: number;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  rating: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
