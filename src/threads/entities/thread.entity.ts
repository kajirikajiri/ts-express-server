import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Scrap } from 'src/scraps/entities/scrap.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Thread {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column('varchar')
  text!: string;

  @Column({ type: 'uuid', nullable: true })
  parentThreadId: null | string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToMany(() => Scrap, (scrap) => scrap.threads)
  scraps: Scrap[];
}
