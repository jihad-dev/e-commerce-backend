import { Query, Schema, model } from "mongoose";
import { IAdmin } from "./admin.interface";
import bcrypt from 'bcrypt';
const adminSchema = new Schema<IAdmin>({
    userId: {
        type: String,
        unique: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "superAdmin"] },
    status: { type: String, required: true, enum: ["in-progress", "blocked"] },
    isDeleted: { type: Boolean, required: true, default: false },
});


// 👇 This automatically filters out isDeleted: true from all find queries
adminSchema.pre<Query<any, any>>(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});


// password hash
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

export const Admin = model<IAdmin>("Admin", adminSchema);
