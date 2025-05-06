import { initPayment } from "../Payment/payment.utils";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { nanoid } from 'nanoid';

const createOrder = async (payload: IOrder) => {
  let user = await User.findById(payload.userId);

  if (!user) {
    throw new Error("User not found");
  }

  const transactionId = nanoid(10);
  const orderData = {
    ...payload,
    userId: payload.userId,

    // transactionId: transactionId,
  };



  // যদি paymentMethod 'Cash on Delivery' হয় তাহলে gateway call করবো না
  if (payload.paymentMethod === 'Cash on Delivery') {
    const result = await Order.create(orderData);
    return {
      result,
    };
  } else {
    const paymentData = {
      transactionId,
      totalPrice: payload.totalPrice,
      custrmerName: user?.name,
      customerEmail: user?.email,
      customerPhone: payload.shippingInfo.phone,
      customerAddress: payload.shippingInfo.address,
      customerCity: payload.shippingInfo.city,
      customerCountry: payload.shippingInfo.country,
      customerPostcode: payload.shippingInfo.postalCode,

    }
    const paymentSession = await initPayment(paymentData, payload);

   
    return {
      paymentSession,
    };
  }



};

const getOrders = async () => {
  const result = await Order.find().populate('orderItems.product').populate('userId');
  return result;
};

const getOrderById = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};
const getUserOrder = async (userId: string) => {
  const result = await Order.find({ userId }).populate('orderItems.product').populate('userId');
  return result;
};

const updateOrderStatus = async (id: string, status: string) => {
  const result = await Order.findByIdAndUpdate(id, { status }, { new: true });
  return result;
};


const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const orderService = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getUserOrder
};