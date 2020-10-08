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

@Entity({ name: "book_copies" })
export class BookCopy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.copies, { onDelete: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book: Promise<Book>;

  @Column({ name: "book_id" })
  bookId: number;

  @ManyToOne(() => User, (user) => user.ownedBookCopies)
  @JoinColumn({ name: "owner_id" })
  owner: Promise<User>;

  @Column({ name: "owner_id" })
  ownerId: number;

  @ManyToOne(() => User, (user) => user.borrowedBookCopies)
  @JoinColumn({ name: "borrower_id" })
  borrower: Promise<User>;

  @Column({ name: "borrower_id", nullable: true })
  borrowerId: null | number;

  @Column({ name: "borrowed_at", type: "datetime", nullable: true })
  borrowedAt: null | Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
