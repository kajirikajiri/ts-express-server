import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateScrapInput {
  @Field(() => String!)
  title!: string;

  @Field(() => String!)
  userId!: string;
}
