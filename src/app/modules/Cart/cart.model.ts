import { Schema, model } from 'mongoose';
import { TCart, TCartItem } from './cart.interface';

const cartItemSchema = new Schema<TCartItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product', // Assuming your product model is named 'Product'
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Quantity should be at least 1
    },
    // price: { type: Number }, // Optional: Store price if needed
  },
  { _id: false }, // Don't create a separate _id for subdocuments
);

const cartSchema = new Schema<TCart>(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
    // totalPrice: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  },
);

export const Cart = model<TCart>('Cart', cartSchema); 