import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

export const AVATAR_COLORS = [
  "red",
  "green",
  "blue",
  "yellow",
  "magenta",
  "pink",
  "black"
];

@Entity({ name: "avatars" })
export class Avatar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "image_path" })
  imagePath: string;

  @Column()
  color: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
