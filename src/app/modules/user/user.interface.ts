import { Model } from "mongoose";

export interface IUser{
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;

}


export type UserModel = Model<IUser>;

