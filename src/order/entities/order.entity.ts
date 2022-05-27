import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetail } from './order-detail.entity';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @OneToMany(() => OrderDetail, (detail) => detail.order, {
    onDelete: 'CASCADE',
  })
  @Field(() => [OrderDetail])
  detail: OrderDetail[];

  @Column()
  @Field(() => Int)
  createdOn: number;
}
