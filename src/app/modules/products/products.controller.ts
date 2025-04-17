import httpStatus from "http-status";
import { IProduct } from "./products.interface";
import { productServices } from "./products.services";
import { createProductValidation } from "./products.validation";
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";




const createProduct = catchAsync(async (req, res): Promise<void> => {
    const product: IProduct = req.body;
    const zodResponse = createProductValidation.safeParse(product);
    if (!zodResponse.success) {
        res.status(400).json({
            success: false,
            message: "Invalid product data",
            error: zodResponse.error,
        });
        return;
    }
    const result = await productServices.createProductIntoDB(product);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product created successfully",
        data: result,
    });
});

const getAllProducts = catchAsync(async (req, res): Promise<void> => {
    const result = await productServices.getAllProductsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products fetched successfully",
        data: result,
    });
});

const getSingleProduct = catchAsync(async (req, res): Promise<void> => {
    const { id } = req.params;
    const result = await productServices.getSingleProductFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single Product fetched successfully",
        data: result,
    });
});


export const productController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
};
