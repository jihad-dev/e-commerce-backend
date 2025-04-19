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
      id: user.userId,
      email: user.email,
      role: role,
    },
    config.jwt_secret as string,
    { expiresIn: "1d" }
  );
  // refresh token
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

const refreshToken = async (refreshToken: string) => {
 // check if the refresh token is valid
 const decoded = jwt.verify(refreshToken, config.jwt_refresh_secret as string) as JwtPayload;
 // Type guard to ensure decoded is JwtPayload
 if (typeof decoded === 'string' || !decoded) {
  throw new Error("Invalid refresh token");
 }


 // check if the user exists
 // Use decoded.id after type checking
 const user = await User.findOne({ userId: decoded.id });

 if (!user) {
  throw new Error("User not found");
 }

 // Extract role from decoded token
 const role = decoded.role;

 const accessToken = jwt.sign(
  {
    id: user.userId,
    email: user.email,
    role: role, // Use extracted role
  },
  config.jwt_secret as string,
  { expiresIn: "1d" }
);

 // Return the new access token
 return {
    accessToken,
 };


}

export const AuthServices = {
  loginUser,
  refreshToken,
};
