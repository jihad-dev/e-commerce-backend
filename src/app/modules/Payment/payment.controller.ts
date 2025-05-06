import { Request, Response } from "express";
import { paymentServices } from "./payment.services";

const confirmationController = async (req: Request, res: Response) => {
    const { transactionId, paymentStatus, orderdata } = req.query;
    let parsedOrderData = null;

    // orderdata থাকলে তবেই parse করো
    if (orderdata) {
        parsedOrderData = JSON.parse(decodeURIComponent(orderdata as string));
    }
    const result = await paymentServices.confirmationService(transactionId as string, paymentStatus as string, parsedOrderData);

    res.send(result);
}





export const paymentController = {
    confirmationController,
}

