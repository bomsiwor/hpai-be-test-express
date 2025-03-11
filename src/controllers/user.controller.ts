import { Request, Response } from "express";
import * as userService from "../services/user.service";

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
