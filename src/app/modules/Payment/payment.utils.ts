import config from "../../config";
import axios from "axios";


export const initPayment = async (paymentData: any) => {
    const res = await axios.post(`${config.payment_url as string}`, {
        store_id: config.store_id as string,
        signature_key: config.signature_key as string,
        tran_id: paymentData?.transactionId,
        success_url: "http://www.merchantdomain.com/sucesspage.html",
        fail_url: "http://www.merchantdomain.com/failedpage.html",
        cancel_url: "http://www.merchantdomain.com/cancellpage.html",
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

