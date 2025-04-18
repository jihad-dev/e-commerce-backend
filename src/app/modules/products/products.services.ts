import { IProduct } from "./products.interface";
import { ProductModel } from "./products.model";

const createProductIntoDB = async (product: IProduct) => {
    const result = await ProductModel.create(product);
    return result;
}
const getAllProductsFromDB = async (): Promise<IProduct[]> => {
    const result = await ProductModel.find();
    return result;
}
const getSingleProductFromDB = async (id: string): Promise<IProduct | null> => {
    const result = await ProductModel.findOne({ _id: id });
    return result;
}
const deleteProductFromDB = async (id: string): Promise<IProduct | null> => {
    const result = await ProductModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
}
export const productServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    deleteProductFromDB,
}

