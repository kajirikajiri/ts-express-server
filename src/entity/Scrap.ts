import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ScrapThreadRelation } from "./ScrapThreadRelation";
import { UserScrapRelation } from "./UserScrapRelation";

@Entity()
export class Scrap {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column("varchar")
  title!: string;

  @OneToMany(
    () => ScrapThreadRelation,
    (scrapThreadRelation) => scrapThreadRelation.scrap,
    { onDelete: "CASCADE", cascade: true }
  )
  scrapThreadRelations: ScrapThreadRelation[];

  @OneToMany(
    () => UserScrapRelation,
    (UserScrapRelation) => UserScrapRelation.scrap,
    { onDelete: "CASCADE" }
  )
  userScrapRelations: UserScrapRelation[];

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(title: string) {
    this.title = title;
  }
}
