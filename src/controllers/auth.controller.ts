import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";

export async function handleLogin(req: Request, res: Response) {
   try {
      const { email, password } = req.body;
      const data = await authService.login({ email, password });

      res.status(200).json({
         message: "user logged in",
         data: data,
      });
   } catch (error) {
      if (error instanceof Error) {
         res.status(400).json({
            message: "user login failed",
            data: error.message,
         });
      }
   }
}

export async function handleLogout(req: Request, res: Response) {
   try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);

      res.status(200).json({
         message: "logout successful",
      });
   } catch (error) {
      if (error instanceof Error) {
         res.status(400).json({
            message: "logout failed",
            data: error.message,
         });
      }
   }
}

export async function handleAuthorize(req: Request, res: Response) {
   res.status(200).json({
      message: "authorized",
      accessToken: res.locals.accessToken,
   });
}

export async function handleMe(req: Request, res: Response) {
   try {
      const userId = res.locals.userId;
      const user = await userService.getById(userId);

      if (!user) {
         res.status(404).json({
            message: "user not found",
         });
         return;
      }
      // Hide user password
      delete user.password;

      res.status(200).json({
         message: "Logged in user authorized ",
         data: { _id: user._id, name: user.name, email: user.email, roles: user.roles },
      });
   } catch (error) {
      if (error instanceof Error) {
         res.status(404).json({
            message: "user not found",
            data: { ...error },
         });
      }
   }
}
