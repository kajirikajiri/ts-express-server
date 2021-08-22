import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserScrapRelationsService } from './user-scrap-relations.service';
import { UserScrapRelation } from './entities/user-scrap-relation.entity';
import { CreateUserScrapRelationInput } from './dto/create-user-scrap-relation.input';
import { UpdateUserScrapRelationInput } from './dto/update-user-scrap-relation.input';

@Resolver(() => UserScrapRelation)
export class UserScrapRelationsResolver {
  constructor(
    private readonly userScrapRelationsService: UserScrapRelationsService,
  ) {}

  @Mutation(() => UserScrapRelation)
  createUserScrapRelation(
    @Args('createUserScrapRelationInput')
    createUserScrapRelationInput: CreateUserScrapRelationInput,
  ) {
    return this.userScrapRelationsService.create(createUserScrapRelationInput);
  }

  @Query(() => [UserScrapRelation], { name: 'userScrapRelations' })
  findAll() {
    return this.userScrapRelationsService.findAll();
  }

  @Query(() => UserScrapRelation, { name: 'userScrapRelation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userScrapRelationsService.findOne(id);
  }

  @Mutation(() => UserScrapRelation)
  updateUserScrapRelation(
    @Args('updateUserScrapRelationInput')
    updateUserScrapRelationInput: UpdateUserScrapRelationInput,
  ) {
    return this.userScrapRelationsService.update(
      updateUserScrapRelationInput.id,
      updateUserScrapRelationInput,
    );
  }

  @Mutation(() => UserScrapRelation)
  removeUserScrapRelation(@Args('id', { type: () => Int }) id: number) {
    return this.userScrapRelationsService.remove(id);
  }
}
