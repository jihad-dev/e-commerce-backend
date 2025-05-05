import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync'; // Assuming utility path
// Assuming utility path
import { CartService } from './cart.service';
import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import AppError from '../../errors/AppError';


const addToCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }
  const cartData = req.body;
  const result = await CartService.addToCart(userId, cartData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item added to cart successfully',
    data: result,
  });
}); 
// get user cart 
const getUserCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }
  const result = await CartService.getUserCart(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User cart fetched successfully',
    data: result,
  });
});
// update cart 
const updateCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }
  const cartData = req.body;
  const result = await CartService.updateCart(userId, cartData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart updated successfully',
    data: result, 
  });
});
// remove cart item 
const removeCartItem = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  const productId = req.body.productId;
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }
  const result = await CartService.removeCartItem(userId, productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart item removed successfully',
    data: result,   
  });
});
export const CartController = {
  addToCart,
  getUserCart,
  updateCart,
  removeCartItem,
}; 