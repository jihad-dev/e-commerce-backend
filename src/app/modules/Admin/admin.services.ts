import { generateAdminUserId } from "../../utils/generateAdminUserId";
import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

 const createAdmin = async (admin: IAdmin): Promise<IAdmin> => {
  const isAdminExists = await Admin.findOne({ email: admin.email });
  if (isAdminExists) {
    throw new Error("Admin already exists");
  }

  const userId = await generateAdminUserId();

  const newAdmin = await Admin.create({
    ...admin,
    userId,
  });

  return newAdmin;
};

const getAllAdmin = async (): Promise<IAdmin[]> => {
    const admins = await Admin.find();
    return admins;
};

export const AdminServices = {
    createAdmin,
    getAllAdmin,
}

