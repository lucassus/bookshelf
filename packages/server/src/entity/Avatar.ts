import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Avatar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "image_path" })
  imagePath: string;

  @Column()
  color: string;
}
