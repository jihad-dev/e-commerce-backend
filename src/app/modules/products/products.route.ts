import { Router } from "express";
import { productController } from "./products.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/create-product", auth(['admin', 'superAdmin']), productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);
router.delete("/:id", auth(['admin', 'superAdmin']), productController.deleteProduct);
export const ProductRoutes = router;

