import { Order } from "../Order/order.model"
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string, paymentStatus: string, orderdata: any) => {
    const res = await verifyPayment(transactionId);

    let result;
    if (res?.pay_status === 'Successful') {


        const createdOrder = await Order.create(orderdata);
        await Order.findByIdAndUpdate(
            createdOrder._id,
            {
                $set: {
                    paymentStatus: 'Paid',
                    'paymentInfo.transactionId': transactionId,
                    'paymentInfo.totalPrice': res?.amount,
                    'paymentInfo.customerEmail': res?.cus_email,
                    'paymentInfo.customerPhone': res.cus_phone
                }
            },
            { new: true }
        );

    }

    return `<h1>Payment ${paymentStatus}</h1>`;

};


export const paymentServices = {
    confirmationService,
}


