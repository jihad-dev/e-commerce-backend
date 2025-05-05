import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidation } from "./admin.validation";

const router = Router();

router.post("/create-admin", validateRequest(adminValidation.createAdminZodSchema), auth(['admin', 'superAdmin']), AdminController.createAdmin);
router.get('/', auth(['admin', 'superAdmin']), AdminController.getAllAdmin);
router.get('/:id', auth(['admin', 'superAdmin']), AdminController.getSingleAdmin);
router.delete('/:id', auth(['admin', 'superAdmin']), AdminController.deleteAdmin);
export const AdminRoutes = router;


