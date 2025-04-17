
import { Router } from "express";
import { ProductRoutes } from "../modules/products/products.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { AdminRoutes } from "../modules/Admin/admin.route";

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
    }
];

moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
