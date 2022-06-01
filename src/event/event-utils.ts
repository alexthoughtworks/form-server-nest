import { OrderSummary } from '../order/dto/order-summary.dto';
import { OrderDetail } from '../order/entities/order-detail.entity';
import { Order } from '../order/entities/order.entity';
import { ProductSummary } from '../product/dto/product-summary.dto';

export const toOrderSummary = ({ id, detail }: Order): OrderSummary => {
  let count = 0;
  let total = 0;
  detail.forEach((detailLine) => {
    count += 1;
    total += detailLine.quantity * detailLine.product.price;
  });
  return {
    id,
    count,
    total,
  };
};

export const toProductSummary = (detail: OrderDetail): ProductSummary => {
  const {
    quantity: count = 0,
    product: { id },
  } = detail;
  return {
    id,
    count: +count,
  };
};
