
import config from "../../config";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
  const jwtPayload = {
    userId: isUserExists._id,
    role: isUserExists.role,
  }

  // generate token and return user data
  const token = jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn: '10d' });
  console.log(token, 'token');

  return {
    token,
  }

};

export const AuthServices = {
  loginUser,
}

