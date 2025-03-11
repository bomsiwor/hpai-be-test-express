import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { deleteUser } from "../repositories/user.repository";

export async function handleGetList(req: Request, res: Response) {
   try {
      const users = await userService.get();

      res.status(200).json({
         message: "List of user",
         data: users,
      });
   } catch (error) {
      if (error instanceof Error) {
         res.status(500).json({
            message: "Error on serverside",
            data: { ...error },
         });
      }
   }
}

export async function handleGetOne(req: Request, res: Response) {
   try {
      // Get user id from param
      const { userId } = req.params;

      // Get detail of user
      const user = await userService.getById(userId);

      if (!user) {
         res.status(404).json({
            message: "User not found",
         });
         return;
      }

      res.status(200).json({
         message: "User detail",
         data: user,
      });
   } catch (error) {
      if (error instanceof Error) {
         res.status(500).json({
            message: "Error on serverside",
            data: { ...error },
         });
      }
   }
}

export async function handleCreate(req: Request, res: Response) {
   try {
      // Get user id from param
      const { name, email, password, role } = req.body;

      // Get detail of user
      const user = await userService.create({
         name,
         email,
         password,
         roles: role,
      });

      if (!user) {
         res.status(500).json({
            message: "Server problem",
         });
         return;
      }

      res.status(201).json({
         message: "User created",
         data: user,
      });
   } catch (error) {
      if (error instanceof Error) {
         res.status(500).json({
            message: "Error on serverside",
            data: { ...error },
         });
      }
   }
}

export async function handleDelete(req: Request, res: Response) {
   try {
      const { userId } = req.params;

      // Cannot delete self account
      if (userId == res.locals.userId) {
         res.status(409).json({
            message: "Can not delete account",
         });
         return;
      }

      // Get detail of user
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deletedUser = await userService.deleteById(userId);

      if (!deleteUser) {
         res.status(500).json({
            message: "User not found",
         });
         return;
      }

      res.status(200).json({
         message: "User deleted",
      });
   } catch (error) {
      if (error instanceof Error) {
         res.status(500).json({
            message: "Error on serverside",
            data: { ...error },
         });
      }
   }
}
