
import { Router } from "express";
import { ProductRoutes } from "../modules/products/products.route";
import { UserRoutes } from "../modules/user/user.route";

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
        path:'/admins',
        route:UserRoutes,
    }
];

moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
