
import { Router } from "express";
import { ProductRoutes } from "../modules/products/products.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CartRoutes } from "../modules/Cart/cart.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { OrderRoutes } from "../modules/Order/order.route";

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
        path: "/admins",
        route: AdminRoutes,
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
    }

];

moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
