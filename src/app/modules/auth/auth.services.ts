// services/auth.service.ts

import { Admin } from "../Admin/admin.model";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
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
      id: user?._id, // TODO: change to userId
      email: user?.email,
      role: role,
    },
    config.jwt_secret as string,
    { expiresIn: "3d" }
  );
  // refresh token
  const refreshToken = jwt.sign(
    {
      id: user?.userId,
      email: user?.email,
      role: role,
    },
    config.jwt_refresh_secret as string,
    { expiresIn: "30d" }
  );
  return {
    accessToken,
    refreshToken,

  };
};

const refreshToken = async (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, config.jwt_refresh_secret as string) as JwtPayload;
  if (typeof decoded === 'string' || !decoded) {
    throw new Error("Invalid refresh token");
  }
  let role = "user";
  let user = await User.findOne({ email: decoded?.email });
  if (!user) {
    user = await Admin.findOne({ email: decoded?.email });
    role = "admin";
  }

  if (!user) {
    throw new Error("User not found");
  }

  if (!user) {
    throw new Error("User not found0000");
  }
  const accessToken = jwt.sign(
    {
      id: user?.userId,
      email: user?.email,
      role: role,
    },
    config.jwt_secret as string,
    { expiresIn: "30s" }
  );

  return {
    accessToken,
  };

}

export const AuthServices = {
  loginUser,
  refreshToken,
};
