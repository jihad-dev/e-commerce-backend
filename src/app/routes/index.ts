
import { Router } from "express";
import { ProductRoutes } from "../modules/products/products.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CartRoutes } from "../modules/Cart/cart.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { OrderRoutes } from "../modules/Order/order.route";
import { PaymentRoutes } from "../modules/Payment/payment.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/products",
        route: ProductRoutes,
    },
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/cart",
        route: CartRoutes,
    },
    {
        path: '/categories', 
        route: CategoryRoutes,
    },
    {
        path: '/orders',
        route: OrderRoutes,
    },
    {
        path: '/payment',
        route: PaymentRoutes,
    }

];

moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
