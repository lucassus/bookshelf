import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Book } from "./Book";

@Entity({ name: "authors" })
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: "" })
  bio: string;

  @Column({ name: "photo_path" })
  photoPath: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Promise<Book[]>;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
