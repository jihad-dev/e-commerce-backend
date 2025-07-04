import config from "../../config";
import axios from "axios";


export const initPayment = async (paymentData: any, payload: any) => {
  
    const orderData = {
        ...payload,
        userId: payload.userId,
    };
    const res = await axios.post(`${config.payment_url as string}`, {
        store_id: config.store_id as string,
        signature_key: config.signature_key as string,
        tran_id: paymentData?.transactionId,
        success_url: `${config.success_url as string}?transactionId=${paymentData?.transactionId}&orderdata=${encodeURIComponent(JSON.stringify(orderData))}&paymentStatus=Success`,
        fail_url: `${config.success_url as string}?paymentStatus=Failed`,
        cancel_url: "http://localhost:5173",
        amount: paymentData?.totalPrice,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: paymentData?.custrmerName,
        cus_email: paymentData?.customerEmail,
        cus_add1: paymentData?.customerAddress,
        cus_city: paymentData?.customerCity,
        cus_country: paymentData?.customerCountry,
        cus_postcode: paymentData?.customerPostcode,
        cus_phone: paymentData?.customerPhone,
        type: "json"
    });
    return res.data;
};

export const verifyPayment = async (transactionId: string) => {
    const res = await axios.get(config.payment_verify_url as string, {
        params: {
            store_id: config.store_id as string,
            signature_key: config.signature_key as string,
            type: "json",
            request_id: transactionId,

        }
    })
    return res.data;
}
