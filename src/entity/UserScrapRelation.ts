import {CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import { Scrap } from "./Scrap";

@Entity()
export class UserScrapRelation {
  @PrimaryColumn('varchar')
  readonly userId!: string;

  @PrimaryColumn('uuid')
  readonly scrapId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(()=>Scrap, scrap=>scrap.userScrapRelations, {onDelete: 'CASCADE', cascade: true})
  scrap: Scrap

  constructor(userId: string, scrap: Scrap) {
    this.userId = userId
    this.scrap = scrap
  }
}
