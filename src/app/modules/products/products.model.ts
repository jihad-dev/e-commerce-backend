import { Query, Schema, model } from "mongoose";
import { IProduct } from "./products.interface";

const productSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], required: true },
    ratings: { type: Number, required: true },
    ratingsCount: { type: Number, required: true },
    isFeatured: { type: Boolean, required: true },
    status: { type: String, required: true },
    shipping: { type: Number, required: true },
    seller: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },

});

// 👇 This automatically filters out isDeleted: true from all find queries
productSchema.pre<Query<any, any>>(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});
 
export const ProductModel = model<IProduct>("Product", productSchema);