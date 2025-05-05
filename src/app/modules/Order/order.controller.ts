import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { orderService } from './order.service';
import { sendResponse } from '../../utils/sendResponse';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const { orderItems, shippingInfo, paymentMethod, totalPrice, phone } = req.body;

    const userId = req?.body?.userId;


    if (!userId) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated or userId missing');
    }

    const order = await orderService.createOrder({ orderItems, shippingInfo, paymentMethod, totalPrice, userId, phone, status: 'Pending' });
    sendResponse(res, {
        success: true,
        message: 'Order created successfully',
        data: order,
        statusCode: 201,
    });
});


const getOrders = catchAsync(async (req: Request, res: Response) => {
    const orders = await orderService.getOrders();
    sendResponse(res, {
        success: true,
        message: 'Orders retrieved successfully',
        data: orders,
        statusCode: 200,
    });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    sendResponse(res, {
        success: true,
        message: 'Order retrieved successfully',
        data: order,
        statusCode: 200,
    });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = await orderService.updateOrderStatus(id, status);
    sendResponse(res, {
        success: true,
        message: 'Order status updated successfully',
        data: order,
        statusCode: 200,
    });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await orderService.deleteOrder(id);
    sendResponse(res, {
        success: true,
        message: 'Order deleted successfully',
        data: null,
        statusCode: 200,
    });
});

export const OrderControllers = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};
