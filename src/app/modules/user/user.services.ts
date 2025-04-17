import { IUser } from "./user.interface";
import User from "./user.model";

const createUser = async (user: IUser): Promise<IUser> => {
    const result = await User.create(user);
    return result;
}

const createAdmin = async (user: IUser): Promise<IUser> => {
    user.role = 'admin';
    const result = await User.create(user);
    return result;
}

const getAllUser = async (): Promise<IUser[]> => {
    const result = await User.find();
    return result;
}

const getAllAdmin = async (): Promise<IUser[]> => {
    const result = await User.find({ role: 'admin' });
    return result;
}

const deleteUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findByIdAndUpdate(id, { role: 'user', isDeleted: true }, { new: true });
    return result;
}

const deleteAdmin = async (id: string): Promise<IUser | null> => {
    const result = await User.findByIdAndUpdate(id, { role: 'admin', isDeleted: true }, { new: true });
    return result;
}
export const UserServices = {
    createUser,
    getAllUser,
    deleteUser,
    createAdmin,
    getAllAdmin,
    deleteAdmin,
}
