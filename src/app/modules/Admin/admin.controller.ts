import { Request, Response } from "express";
import { AdminServices } from "./admin.services";
import { sendResponse } from "../../utils/sendResponse";
import { IAdmin } from "./admin.interface";
import httpStatus from "http-status";


const createAdmin = async (req: Request, res: Response) => {
  const admin = req.body;
  const result = await AdminServices.createAdmin(admin);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
}

const getAllAdmin = async (req: Request, res: Response) => {
  const result = await AdminServices.getAllAdmin();
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins fetched successfully",
    data: result,
  });
};
export const AdminController = {
  createAdmin,
  getAllAdmin,
};
