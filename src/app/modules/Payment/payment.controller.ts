import { Request, Response } from "express";
import { paymentServices } from "./payment.services";

const confirmationController = async (req: Request, res: Response) => {
    console.log(req.query.transactionId);
    const result = await paymentServices.confirmationService(req.query.transactionId as string);
   
    res.send(`<h1>Payment Success</h1>`);
}





export const paymentController = {
    confirmationController,
}
  
