import express, { NextFunction } from "express";
import cors from "cors";
import { Request, Response } from "express";
import { ProductRoutes } from "./app/modules/products/products.route";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFoundRoute } from "./app/middlewares/notFoundRoute";
import router from "./app/routes";
import cookieParser from "cookie-parser";
const app = express();

// parser
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello next level Developer!!");
});

// global error handler
app.use(globalErrorHandler);

// handle not found route
app.use(notFoundRoute);

export default app;
