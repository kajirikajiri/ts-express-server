import { CreateScrapInput } from './create-scrap.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateScrapInput extends PartialType(CreateScrapInput) {
  @Field(() => String)
  id: string;
}
