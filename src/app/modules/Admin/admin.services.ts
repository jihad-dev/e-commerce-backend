import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdmin = async (admin: IAdmin) => {
    const isAdminExists = await Admin.findOne({ email: admin.email });
    if (isAdminExists) {
        throw new Error("Admin already exists");
    }
    const result = await Admin.create(admin);
    return result;
}

export const AdminServices = {
    createAdmin,
}

