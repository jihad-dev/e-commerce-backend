import { AuthServices } from "./auth.services";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ILoginUser } from "./auth.interface";
import { AuthValidation } from "./auth.validation";

const loginUser = async (req: Request, res: Response): Promise<void> => {
    const user: ILoginUser = req.body;
    const zodResponse = AuthValidation.loginUserValidation.safeParse(user);
    if (!zodResponse.success) {
        sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: "User login failed",
            data: null,
        });
        return;
    }
    const result = await AuthServices.login(user);
        sendResponse<ILoginUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
}

export const AuthController = {
    loginUser,
}