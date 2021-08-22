import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateThreadInput {
  @Field(() => String)
  text!: string;

  @Field(() => String, { nullable: true })
  parentId: string | null;

  @Field(() => String)
  scrapId: string;
}
