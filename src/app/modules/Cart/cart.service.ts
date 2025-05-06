import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCartItem } from './cart.interface';
import { Cart } from './cart.model';
import mongoose from 'mongoose';
import { ProductModel } from '../products/products.model';

const addToCart = async (userId: string, payload: TCartItem) => {
  const { productId, quantity } = payload;

  // Validate product ID format before hitting the database
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Product ID format');
  }

  // 1. Check if the product exists and has sufficient stock (if applicable)
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
 
  // 2. Find the user's cart, or create a new one if it doesn't exist
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  // 3. Check if the product is already in the cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId.toString(),
  );

  if (existingItemIndex > -1) {
    // 4. If exists, update the quantity
    cart.items[existingItemIndex].quantity += quantity;
    // Optional: Recalculate price if stored in cart item
  } else {
    // 5. If not exists, add the new item to the cart
    cart.items.push({ productId, quantity });
    
  }

  // 6. Save the updated cart
  await cart.save();

  // 7. Populate product details for the response (optional but good UX)
  const updatedCart = await Cart.findById(cart._id).populate(
    'items.productId', // Populate product details in items
  );

  return updatedCart;
};
// get user cart 
const getUserCart = async (userId: string) => {
  const cart = await Cart.findOne({ userId }).populate('items.productId');
  return cart;
};

// update cart 
const updateCart = async (userId: string, payload: TCartItem) => {
  const { productId, quantity } = payload;
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId.toString(),
  );
  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity = quantity;
  }
  await cart.save();
  return cart;
};
// remove cart item 
const removeCartItem = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId.toString(),
  );
  if (existingItemIndex > -1) {
    cart.items.splice(existingItemIndex, 1);
  } 
  await cart.save();
  return cart;
};
// clear cart 
const clearCart = async (userId: string) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  cart.items = [];
  await cart.save();
  return cart;
};
export const CartService = {
  addToCart,
  getUserCart,
  updateCart,
  removeCartItem,
  clearCart,
}; 