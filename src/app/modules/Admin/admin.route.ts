import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidation } from "./admin.validation";

const router = Router();

router.post("/create-admin", validateRequest(adminValidation.createAdminZodSchema), auth(['admin', 'superAdmin']), AdminController.createAdmin);
router.get('/', auth(['admin', 'superAdmin']), AdminController.getAllAdmin);
export const AdminRoutes = router;


