import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateDetail } from './create-order-detail.input';

@InputType()
export class CreateOrderInput {
  @Field(() => [CreateDetail])
  products: CreateDetail[];

  @Field(() => Int)
  createdOn: number;
}
