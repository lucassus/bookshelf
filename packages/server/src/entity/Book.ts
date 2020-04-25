import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Author } from "./Author";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: "cover_path" })
  coverPath: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
