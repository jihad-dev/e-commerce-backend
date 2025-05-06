import { Order } from "../Order/order.model"
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string) => {
    const res = await verifyPayment(transactionId);
    let result;
    if (res?.pay_status === 'Successful') {
         result = await Order.findOneAndUpdate(
            { 'paymentInfo.transactionId': transactionId },
            { paymentStatus: 'Paid' },     
            { new: true }
        );
    }
    
    return result;

};


export const paymentServices = {
    confirmationService,
}


