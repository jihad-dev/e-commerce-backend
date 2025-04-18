import { Model } from "mongoose";

// Define and export TUserRole
export type TUserRole =  "user" | "admin" | "superAdmin";

export interface IUser{
    userId:string;
    name: string;
    email: string;
    password: string;
    role: TUserRole;
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
}


export type UserModel = Model<IUser>;

