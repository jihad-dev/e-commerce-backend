import QueryBuilder from "../../builder/QueryBuilder";
import { IProduct } from "./products.interface";
import { ProductModel } from "./products.model";

const createProductIntoDB = async (product: IProduct) => {
    const result = await ProductModel.create(product);
    return result;
}
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(ProductModel.find(), query)
        .search(['title', 'description'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await productQuery.modelQuery;
    const meta = await productQuery.countTotal(); 

    return {
        meta,
        result,
    };
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
