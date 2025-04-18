import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync'; // Assuming utility path
// Assuming utility path
import { CartService } from './cart.service';
import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';

// Define the expected user payload structure based on console.log
type UserPayload = {
  userId: string;
  role: string;
};

const addToCart = catchAsync(async (req: Request, res: Response) => {
  // Assert the type of req.user here to match the actual payload
  const user = req.user as UserPayload | undefined; 
  
  // Ensure user is authenticated and user id is available
  if (!user?.userId) { // Check for userId on the asserted type
    sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authentication required',
      data: null,
    });
    return;
  }

  const userId = user.userId; // Use userId from the asserted type
  const cartData = req.body; // Contains productId and quantity (validated)

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
  const userId = req.user?.userId;
  const result = await CartService.getUserCart(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User cart fetched successfully',
    data: result,
  });
});

export const CartController = {
  addToCart,
  getUserCart,
}; 