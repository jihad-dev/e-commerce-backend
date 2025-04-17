import { Response } from "express";

interface IApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

export const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
    const responseData: IApiResponse<T> = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
    };
    return res.status(200).json(responseData);
};


