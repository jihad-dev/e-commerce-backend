import express from 'express';
import { CartController } from './cart.controller';
import { CartValidation } from './cart.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';


const router = express.Router();

// Route to add an item to the cart
router.post(
  '/add-to-cart',
  auth(["user", "admin", "superAdmin"]),
  validateRequest(CartValidation.addToCartValidationSchema),
  CartController.addToCart,
);

// Route to get user cart
router.get(
  '/',
  auth(["user", "admin", "superAdmin"]),
  CartController.getUserCart,
);

// Route to update cart
router.put(
  '/update-cart',
  auth(["user", "admin", "superAdmin"]),
  validateRequest(CartValidation.updateCartValidationSchema),
  CartController.updateCart,
);

// Route to remove cart item
router.delete(
    '/remove-from-cart/:productId',
    auth(["user", "admin", "superAdmin"]),
    CartController.removeCartItem,
);

// Route to clear cart
router.delete(
  '/clear-cart',
  auth(["user", "admin", "superAdmin"]),
  CartController.clearCart,
);


export const CartRoutes = router; 