import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post("/login", AuthController.loginUser);

router.post('/refresh-token',validateRequest(AuthValidation.refreshTokenValidation), AuthController.refreshToken);

export const AuthRoutes = router;
