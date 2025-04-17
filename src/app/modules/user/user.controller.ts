import { Request, Response } from 'express';
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "./user.interface";
import { UserServices } from "./user.services";
import httpStatus from "http-status";
import { UserValidation } from './user.validation';

const createUser = async (req: Request, res: Response): Promise<void> => {

    const user: IUser = req.body;
    const zodResponse = UserValidation.createUserValidationSchema.safeParse(user);
    if (!zodResponse.success) {
        sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: "User creation failed",
            data: null,
        });
        return;
    }
    const result = await UserServices.createUser(user);
    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully",
        data: result,
    });

}
const getAllUser = async (req: Request, res: Response): Promise<void> => {
    const result = await UserServices.getAllUser();
    sendResponse<IUser[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully",
        data: result,
    });

}

const deleteUser = async (req: Request, res: Response): Promise<void> => {  
    const { id } = req.params;
    const result = await UserServices.deleteUser(id);
    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
}
export const UserController = {
    createUser,
    getAllUser,
    deleteUser,
};
