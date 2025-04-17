import { Router } from "express";
import { productController } from "./products.controller";

const router = Router();

router.post("/create-product", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);

export const ProductRoutes = router;

