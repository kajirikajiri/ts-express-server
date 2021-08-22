import { Field, ObjectType } from '@nestjs/graphql';
import { Thread } from '../../threads/entities/thread.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserScrapRelation } from '../../user-scrap-relations/entities/user-scrap-relation.entity';
import { Min } from 'class-validator';

// https://github.com/typeorm/typeorm/issues/420
// Be careful not to forget to define the entity!
@Entity()
@ObjectType()
export class Scrap {
  // https://docs.nestjs.com/graphql/resolvers#:~:text=TypeScript%27s%20metadata%20reflection,these%20for%20us.
  // available that get from GraphQL
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field()
  @Column('varchar')
  @Min(1)
  title!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToMany(() => Thread, (thread) => thread.scraps, { cascade: true })
  @JoinTable({
    name: 'scrap_threads_relation',
    joinColumn: {
      name: 'scrap',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'thread',
      referencedColumnName: 'id',
    },
  })
  threads: Thread[];

  @OneToMany(
    () => UserScrapRelation,
    (UserScrapRelation) => UserScrapRelation.scrap,

    // Scrapが消えたらUserScrapRelationも消す
    // https://stackoverflow.com/a/55101273
    { cascade: true },
  )
  userScrapRelations: UserScrapRelation[];

  constructor(title: string) {
    this.title = title;
  }
}
