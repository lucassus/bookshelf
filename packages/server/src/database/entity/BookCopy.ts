import { Column, Entity } from "typeorm";

@Entity({ name: "book_copies" })
export class BookCopy {
  @Column({ name: "owner_id" })
  ownerId: number;

  @Column({ name: "book_id" })
  bookId: number;

  @Column({ name: "borrower_id", nullable: true })
  borrowerId: number;
}
