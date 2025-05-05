import { Request, Response } from 'express';
import { sendResponse } from "../../utils/sendResponse";
import { IUser, TUserStatus } from "./user.interface";
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
const getAllAdmin = async (req: Request, res: Response): Promise<void> => {
  const result = await UserServices.getAllAdmin();
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins fetched successfully",
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

const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await UserServices.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single User fetched successfully",
    data: result,
  });
}


export const changeUserRole = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await UserServices.changeUserRole(id, role);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully",
    data: result,
  });
};
export const changeUserStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await UserServices.changeUserStatus(id, status);
  if (!result) {
    sendResponse<IUser>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "User not found",
      data: null,
    });
    return;
  }
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
};



export const UserController = {
  createUser,
  getAllUser,
  getAllAdmin,
  deleteUser,
  getSingleUser,
  changeUserRole,
  changeUserStatus,
};
