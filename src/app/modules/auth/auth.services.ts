// services/auth.service.ts

import { Admin } from "../Admin/admin.model";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";


export const loginUser = async (email: string, password: string) => {
  let user = await User.findOne({ email });
  let role = "user";
  if (!user) {
    user = await Admin.findOne({ email });
    role = "admin";
  }

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign(
    {
      id: user.userId,
      email: user.email,
      role: role,
    },
    config.jwt_secret as string,
    { expiresIn: "1d" }
  );
  const refreshToken = jwt.sign(
    { id: user.userId, email: user.email, role: role },
    config.jwt_refresh_secret as string,
    { expiresIn: "30d" }
  );  

  return {
    accessToken,
    refreshToken,
  };
};


export const AuthServices = {
  loginUser,

};
