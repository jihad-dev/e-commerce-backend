import { z } from 'zod';

const addToCartValidationSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product ID is required' }).refine((val) => {
      // Basic check for ObjectId format (24 hex characters)
      return /^[0-9a-fA-F]{24}$/.test(val);
    }, { message: 'Invalid Product ID format' }),
    quantity: z.number({ required_error: 'Quantity is required' }).int().positive({ message: 'Quantity must be a positive integer' }),
  }),
});

export const CartValidation = {
  addToCartValidationSchema,
}; 