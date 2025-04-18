import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";


const createAdmin = async (admin: IAdmin): Promise<IAdmin> => {
    const isAdminExists = await Admin.findOne({ email: admin.email });
    if (isAdminExists) {
        throw new Error("Admin already exists");
    }

    // Find last userId (sorted descending by creation time)
    const lastUser = await Admin.findOne().sort({ createdAt: -1 }).lean();

    let newUserId = 'A-0001'; // Default custom ID

    if (lastUser?.userId) {
        const lastIdNumber = parseInt(lastUser.userId.split('-')[1]);
        const nextIdNumber = lastIdNumber + 1;
        newUserId = `A-${nextIdNumber.toString().padStart(4, '0')}`;
    }

    const newUser = await Admin.create({
        ...admin,
        userId: newUserId, // custom ID
    });

    return newUser;
};

export const AdminServices = {
    createAdmin,
}

