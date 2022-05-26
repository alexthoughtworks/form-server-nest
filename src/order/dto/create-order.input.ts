import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  quantity: number;

  @Field()
  product: string;

  @Field(() => Int)
  createdOn: number;
}
