import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

export const userRouter = Router();

userRouter.use(authMiddleware, roleMiddleware);

userRouter.get("/", userController.handleGetList);

userRouter.get("/:userId", userController.handleGetOne);

userRouter.post("/", userController.handleCreate);

userRouter.delete("/:userId", userController.handleDelete);
