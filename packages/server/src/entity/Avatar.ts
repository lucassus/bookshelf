import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "image_path" })
  imagePath: string;

  @Column()
  color: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
