import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Author } from "./Author";
import { BookCopy } from "./BookCopy";
import { Review } from "./Review";

@Entity({ name: "books", orderBy: { title: "ASC" } })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: "" })
  description: string;

  @Column({ name: "cover_path" })
  coverPath: string;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: "author_id" })
  author: Promise<Author>;

  @Column({ name: "author_id" })
  authorId: number;

  @OneToMany(() => BookCopy, (bookCopy) => bookCopy.book)
  copies: Promise<BookCopy[]>;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Promise<Review[]>;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
