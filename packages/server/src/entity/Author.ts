import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Book } from "./Book";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: "photo_path" })
  photoPath: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
