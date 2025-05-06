import mongoose from "mongoose";

export interface IOrderItem {
    product: mongoose.Types.ObjectId;
    qty: number;
    price: number;
}

export interface IShippingInfo {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
}
export interface IPaymentInfo {
    transactionId: string;
    totalPrice: number;
    customerEmail: string;
    customerPhone: string;

}

export interface IOrder {
    userId: mongoose.Types.ObjectId;
    phone: string;
    orderItems: IOrderItem[];
    shippingInfo: IShippingInfo;
    paymentMethod: string;
    paymentStatus: string;
    paymentInfo?: IPaymentInfo;
    totalPrice: number;

    status: 'Pending' | 'Shipped' | 'Delivered';

}