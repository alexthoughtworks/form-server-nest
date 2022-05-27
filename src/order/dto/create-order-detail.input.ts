import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDetail {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  quantity: number;
}
