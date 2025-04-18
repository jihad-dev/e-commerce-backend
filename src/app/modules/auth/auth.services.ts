import { Admin } from "../Admin/admin.model";
import { User } from "../user/user.model";
import bcrypt from 'bcrypt';
import { ILoginUser } from "./auth.interface";
import generateToken from "../../utils/generateToken";

// Define the expected return type for the login service
interface LoginResult {
  token: string;
}

// Modify login service to accept payload and return data
const login = async (payload: ILoginUser): Promise<LoginResult> => {
  const { userId, password } = payload;

  let user: any = await Admin.findOne({ userId });
  let role: 'admin' | 'user' = 'admin';

  if (!user) {
    user = await User.findOne({ userId });
    role = 'user';
  }

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  const token = generateToken({
    userId: user.userId,
    role: role,
  });


  return {
    token,

  };
};

export const AuthServices = {
  login,
};
