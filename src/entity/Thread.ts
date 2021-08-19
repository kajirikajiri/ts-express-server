import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ScrapThreadRelation } from "./ScrapThreadRelation";

@Entity()
export class Thread {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column("varchar")
  text!: string;

  @Column({ type: "uuid", nullable: true })
  parentThreadId: null | string;

  @OneToMany(
    () => ScrapThreadRelation,
    (scrapThreadRelation) => scrapThreadRelation.thread,
    { onDelete: "CASCADE" }
  )
  scrapThreadRelations: ScrapThreadRelation[];

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(text: string) {
    this.text = text;
  }
}
