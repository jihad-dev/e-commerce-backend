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
  const { email, password, role } = payload;

  let user;

  // Find user based on role
  if (role === 'admin') {
    user = await Admin.findOne({ email });
  } else {
    // Assuming non-admin roles use the User model
    user = await User.findOne({ email });
  }

  if (!user) {
    throw new Error('User not found');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('password is incorrect');
  }

  // Generate token
  const token = generateToken(user);
 

  // Return token and basic user info
  return {
    token,
  };
};

export const AuthServices = {
  login,
}