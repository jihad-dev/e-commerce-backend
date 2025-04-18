import { Types } from 'mongoose';

export type TCartItem = {
  productId: Types.ObjectId;
  quantity: number;
  // We might store price here if we want to lock the price at the time of adding
  // price?: number;
};

export type TCart = {
  userId: string;
  items: TCartItem[];
  // We can add other cart-level details like total price, discounts applied, etc.
  // totalPrice?: number;
};
