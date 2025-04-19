import { z } from "zod";

const createAdminZodSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(1),
        role: z.string().min(1),
        status: z.string().min(1),
        isDeleted: z.boolean(),
    }), 
}); 

export const adminValidation = {
    createAdminZodSchema,
};