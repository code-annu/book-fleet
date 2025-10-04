import { UserService } from "./user-service";
import { Request, Response } from "express";

export class UserController {
  private userService = new UserService();

  async postProfile(req: Request, res: Response) {
    try {
      const userData = req.body;
      const response = await this.userService.createUserProfile(userData);
      res.status(201).json(response);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }
}
