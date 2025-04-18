import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (user: IUser): Promise<IUser> => {
    // Check if email already exists
    const existingUser = await User.findOne({ email: user?.email });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    // Find last userId (sorted descending by creation time)
    const lastUser = await User.findOne().sort({ createdAt: -1 }).lean();

    let newUserId = 'U-0001'; // Default custom ID

    if (lastUser?.userId) {
        const lastIdNumber = parseInt(lastUser.userId.split('-')[1]);
        const nextIdNumber = lastIdNumber + 1;
        newUserId = `U-${nextIdNumber.toString().padStart(4, '0')}`;
    }

    const newUser = await User.create({
        ...user,
        userId: newUserId, // custom ID
    });

    return newUser;
};


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
