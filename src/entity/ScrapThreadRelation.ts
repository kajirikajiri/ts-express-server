import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Scrap } from "./Scrap";
import { Thread } from "./Thread";

@Entity()
export class ScrapThreadRelation {
  @PrimaryColumn("uuid")
  readonly scrapId!: string;

  @PrimaryColumn("uuid")
  readonly threadId!: string;

  @ManyToOne(() => Scrap, (scrap) => scrap.scrapThreadRelations)
  scrap: Scrap;

  @ManyToOne(() => Thread, (thread) => thread.scrapThreadRelations, {
    onDelete: "CASCADE",
    cascade: true,
  })
  thread: Thread;

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(thread: Thread, scrapId: string) {
    this.thread = thread;
    this.scrapId = scrapId;
  }
}
