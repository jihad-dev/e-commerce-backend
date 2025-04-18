import { Model } from "mongoose";

export type TAdminRole = "admin" | "superAdmin";

export interface IAdmin {
    userId:string;
    name: string;
    email: string;
    password: string;   
    role: TAdminRole;
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
}

export type AdminModel = Model<IAdmin>;
