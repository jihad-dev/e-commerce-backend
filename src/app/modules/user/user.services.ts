import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (user: IUser): Promise<IUser> => {
    // Check if email already exists
    const existingUser = await User.findOne({ email: user?.email });
    if (existingUser) {
        throw new Error('Email already exists');
    }
    const result = await User.create(user);
    return result;
}

// get all user or admin 
const getAllUser = async (): Promise<IUser[]> => {
    const result = await User.find();
    return result;
}

const deleteUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findByIdAndUpdate(id, { role: 'user', isDeleted: true }, { new: true });
    return result;
}


export const UserServices = {
    createUser,
    getAllUser,
    deleteUser,
  
}
