import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';

@Entity()
@ObjectType()
export class OrderDetail {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.detail)
  order: Order;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Field(() => Float)
  @Column({ type: 'decimal', nullable: true })
  quantity: number;
}
