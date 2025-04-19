import { z } from "zod";

 const loginUserValidation = z.object({
    email: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required" }).min(6),
}); 

const refreshTokenValidation = z.object({
   cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required" }),
   }),
}); 

export const AuthValidation = {
    loginUserValidation,
    refreshTokenValidation,
}
