import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import { TUserRole } from "../types/user";

export async function roleMiddleware(req: Request, res: Response, next: NextFunction) {
   try {
      const userId = res.locals.userId;

      // Get user role by id
      const user = await userService.getById(userId);

      if (!user) {
         throw new Error("unauthorized");
      }

      // Previledged users
      const previledge: TUserRole[] = ["admin", "super-admin"];

      // Check role of the user
      if (!previledge.find((role) => role == (user.roles as TUserRole))) {
         res.status(403).json({
            message: "action forbidden",
            data: null,
         });
         return;
      }

      next();
   } catch (error) {
      if (error instanceof Error) {
         res.status(401).json({
            message: "unauthorized",
            data: error.message,
         });
      }
   }
}
