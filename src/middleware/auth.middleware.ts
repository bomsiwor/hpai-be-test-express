import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
   try {
      const authData = await authService.authorize(req.cookies);

      if (!authData.userId) {
         throw new Error("unauthorized");
      }

      res.locals.accessToken = authData.accessToken;
      res.locals.userId = authData.userId;

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
