import { Request, Response } from "express";
import { AdminServices } from "./admin.services";

const createAdmin = async (req: Request, res: Response) => {
  const admin = req.body;
  const result = await AdminServices.createAdmin(admin);
  res.status(200).json({
    success: true,
    message: "Admin created successfully",
    data: result,
  });
}

export const AdminController = {
  createAdmin,
};
