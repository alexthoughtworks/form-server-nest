import { InputType, Float, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;
}
