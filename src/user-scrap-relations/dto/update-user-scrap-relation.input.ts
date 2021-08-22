import { CreateUserScrapRelationInput } from './create-user-scrap-relation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserScrapRelationInput extends PartialType(
  CreateUserScrapRelationInput,
) {
  @Field(() => Int)
  id: number;
}
