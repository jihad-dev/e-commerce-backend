import mongoose, { Schema } from 'mongoose';
import { IOrder, IOrderItem, IPaymentInfo, IShippingInfo } from './order.interface';



const orderItemSchema = new Schema<IOrderItem>(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const shippingInfoSchema = new Schema<IShippingInfo>(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const PaymentInfoSchema: Schema = new Schema<IPaymentInfo>(
  {
    transactionId: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    shippingInfo: shippingInfoSchema,
    paymentInfo: PaymentInfoSchema,
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true, default: 'Pending' },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered'],
      default: 'Pending',
    },

  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);