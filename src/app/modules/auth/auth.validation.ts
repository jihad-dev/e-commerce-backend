import { z } from "zod";

 const loginUserValidation = z.object({
    userId: z.string({ required_error: "User ID is required" }),
    password: z.string({ required_error: "Password is required" }).min(6),
}); 

export const AuthValidation = {
    loginUserValidation,
}
