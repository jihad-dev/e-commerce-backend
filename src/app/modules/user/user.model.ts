import { model, Schema } from "mongoose";
import { IUser, IUserMethods } from "./user.interface";
import { UserModel } from "./user.interface";
import * as bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, {}, IUserMethods>({
   
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },  
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user",
    },
    status: {
        type: String,
        required: true,
        enum: ["in-progress", "blocked"],
        default: "in-progress",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true,
});

// password hash
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;        