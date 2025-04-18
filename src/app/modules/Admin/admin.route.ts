import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/create-admin", auth(['admin', 'superAdmin']), AdminController.createAdmin);
router.get('/', auth(['admin', 'superAdmin']), AdminController.getAllAdmin);
export const AdminRoutes = router;


