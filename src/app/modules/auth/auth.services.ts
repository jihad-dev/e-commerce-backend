
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
const loginUser = async (payload: ILoginUser) => {
  const isUserExists = await User.findOne({ email: payload?.email }).select('+password');
  if (!isUserExists) {
    throw new Error("User not found");
  }
// check password

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExists.password
  );
  if (!isPasswordMatched) {
    throw new Error("Password incorrect");
  }
 

};

export const AuthServices = {
    loginUser,
}

