import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Author } from "./Author";
import { Book } from "./Book";

@Entity({ name: "book_copies" })
export class BookCopy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "owner_id" })
  ownerId: number;

  @ManyToOne(() => Book, (book) => book.copies, { onDelete: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book: Promise<Book>;

  @Column({ name: "book_id" })
  bookId: number;

  @Column({ name: "borrower_id", nullable: true })
  borrowerId: number;
}
