import { Model } from "mongoose";

export type IUser = {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
}

export type IUserMethods = {
    isUserExist(id: string): Promise<Partial<IUser> | null>;
    isPasswordMatch(givenPassword: string, savedPassword: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

