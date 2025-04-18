import { AuthServices } from "./auth.services";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import config from "../../config";

 const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await AuthServices.loginUser(email, password);
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: config.node_env === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully",
      data: {
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "User login failed",
      data: error,
    });
  }
};  


export const AuthController = {
    loginUser,
  
}