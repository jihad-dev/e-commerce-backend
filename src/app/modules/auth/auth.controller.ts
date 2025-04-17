import { AuthServices } from "./auth.services";
import { IUser } from "../user/user.interface";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const loginUser = async (req: Request, res: Response): Promise<void> => {
    const result = await AuthServices.login(req.body);
    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
}

export const AuthController = {
    loginUser,
}