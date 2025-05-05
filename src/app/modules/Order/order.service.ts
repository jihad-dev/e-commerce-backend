import { Admin } from "../Admin/admin.model";
import { initPayment } from "../Payment/payment.utils";
import { User } from "../user/user.model";
import { Cart } from "../Cart/cart.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { nanoid } from 'nanoid';

const createOrder = async (payload: IOrder) => {
  let user = await User.findById(payload.userId);
  let role = "user";
  if (!user) {
    user = await Admin.findById(payload.userId);
    role = "admin";
  }
  if (!user) {
    throw new Error("User not found");
  }

  const transactionId = nanoid(10);
  const orderData = {
    ...payload,
    userId: payload.userId,
    userModel: role,
    // transactionId: transactionId,
  };

  const result = await Order.create(orderData);

  // Delete cart items after successful order creation
  await Cart.findOneAndDelete({ userId: payload.userId }); // TODO: check if this is correct

  // যদি paymentMethod 'Cash on Delivery' হয় তাহলে gateway call করবো না
  if (payload.paymentMethod === 'Cash on Delivery') {
    return {
      result,
    };
  } else {
    const paymentData = {
      transactionId,
      totalPrice: result.totalPrice,
      custrmerName: user?.name,
      customerEmail: user?.email,
      customerPhone: result.shippingInfo.phone,
      customerAddress: result.shippingInfo.address,
      customerCity: result.shippingInfo.city,
      customerCountry: result.shippingInfo.country,
      customerPostcode: result.shippingInfo.postalCode,

    }
    const paymentSession = await initPayment(paymentData)

    return {
      result,
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
  deleteOrder
};
