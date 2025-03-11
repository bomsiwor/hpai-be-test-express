import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/login", authController.handleLogin);

authRouter.post("/logout", authMiddleware, authController.handleLogout);

authRouter.get("/me", authMiddleware, authController.handleMe);

authRouter.post("/", authMiddleware, authController.handleAuthorize);
