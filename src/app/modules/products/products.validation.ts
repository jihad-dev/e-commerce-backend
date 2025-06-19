import { z } from "zod";

export const createProductValidation = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(1),
    discount: z.number().min(0),
    finalPrice: z.number().min(1).optional(),
    category: z.string().min(1),
    type: z.string().min(1),
    brand: z.string().min(1),
    stock: z.number().min(1),
    quantity: z.number().min(1),
    images: z.array(z.string()).min(1),
    tags: z.array(z.string()).min(1),
    ratings: z.number().min(1),
    ratingsCount: z.number().min(1),
    isFeatured: z.boolean(),
    status: z.string().min(1),
    shipping: z.number().min(1),
    seller: z.string().min(1),
    isDeleted: z.boolean(),
});

export const updateProductValidation = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().min(1).optional(),
    discount: z.number().min(1).optional(),
    finalPrice: z.number().min(1).optional(),
    category: z.string().min(1).optional(),
    type: z.string().min(1).optional(),
    brand: z.string().min(1).optional(),
    stock: z.number().min(1).optional(),
    quantity: z.number().min(1).optional(),
    images: z.array(z.string()).min(1).optional(),
    tags: z.array(z.string()).min(1).optional(),
    ratings: z.number().min(1).optional(),
    ratingsCount: z.number().min(1).optional(),
    isFeatured: z.boolean().optional(),
    status: z.string().min(1).optional(),
    shipping: z.number().min(1).optional(),
    seller: z.string().min(1).optional(),
    isDeleted: z.boolean().optional(),
});

export const productValidations ={
    createProductValidation,
    updateProductValidation
}