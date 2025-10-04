import { Request, Response } from "express";
import { AuthenticationService } from "./auth-service";

export class AuthenticationController {
  private authenticationService = new AuthenticationService();

  async signupPost(req: Request, res: Response) {
    const data = req.body;
    try {
      const result = await this.authenticationService.signup(data);
      res.status(201).json(result);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }

  async signinPost(req: Request, res: Response) {
    const data = req.body;
    try {
      const result = await this.authenticationService.signin(data);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }
}
