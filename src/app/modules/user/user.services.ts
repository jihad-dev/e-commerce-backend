import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (user: IUser, requestingUser: IUser) => {
  // check if user is already exists
  const existingUser = await User.findOne({ email: user?.email });
  if (existingUser) {
    throw new Error('User already exists');
  }
  // Check if creating an admin user
  if (user.role === 'admin') {
    // Only allow if the requesting user is also an admin
    if (requestingUser.role !== 'admin') {
      throw new Error('Permission denied: Only admins can create other admin users.');
    }
  }
  // Proceed with creation if allowed
  const result = await User.create(user);
  return result;
};


// get all user or admin 
const getAllUser = async (): Promise<IUser[]> => {
    const result = await User.find({ role: 'user' });
    return result;
}
// get all   admin 
const getAllAdmin = async (): Promise<IUser[]> => {
    const result = await User.find({ role: 'admin' });
    return result;
}

const deleteUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findByIdAndUpdate(id, { role: 'user', isDeleted: true }, { new: true });
    return result;
}

// get single user
const getSingleUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findById(id);
    return result;
}

// change user role
const changeUserRole = async (id: string, role: string): Promise<IUser | null> => {
    const result = await User.findByIdAndUpdate(id, { role }, { new: true });
    return result;
}
// change user status
const changeUserStatus = async (id: string, status: string): Promise<IUser | null> => {
    const result = await User.findByIdAndUpdate(id, { status }, { new: true });
    return result;
}
export const UserServices = {
    createUser,
    getAllUser,
    getAllAdmin,
    deleteUser,
    getSingleUser,
    changeUserRole,
    changeUserStatus,
}
