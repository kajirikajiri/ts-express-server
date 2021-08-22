import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Scrap } from '../../scraps/entities/scrap.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class UserScrapRelation {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @PrimaryColumn('varchar')
  readonly userId!: string;

  @PrimaryColumn('uuid')
  readonly scrapId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Scrap, (scrap) => scrap.userScrapRelations)
  scrap: Scrap;

  constructor(userId: string, scrap: Scrap) {
    this.userId = userId;
    this.scrap = scrap;
  }
}
