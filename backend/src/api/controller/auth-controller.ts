import { Request, Response } from "express";
import { Signup } from "../../domain/usecase/auth/signup";
import { AuthRepository } from "../../infrastructure/repository/auth-repository";
import { mapToAuthResponse } from "../mapper/auth-mapper";
import { Login } from "../../domain/usecase/auth/login";
import { CustomError } from "../../domain/error/custom-error";
import { RefreshToken } from "../../domain/usecase/auth/refresh-token";

export class AuthController {
  private signup: Signup;
  private login: Login;
  private refreshToken: RefreshToken;

  constructor() {
    const userRepository = new AuthRepository();
    this.signup = new Signup(userRepository);
    this.login = new Login(userRepository);
    this.refreshToken = new RefreshToken(userRepository);
  }

  async postSignup(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const userWithSession = await this.signup.execute(email, password, role);
      res.status(201).json(mapToAuthResponse(userWithSession));
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async postLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userWithSession = await this.login.execute(email, password);
      res.status(200).json(mapToAuthResponse(userWithSession));
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async postRefreshToken(req: Request, res: Response) {
    try {
      const { refresh_token } = req.body;
      const userWithSession = await this.refreshToken.execute(refresh_token);
      res.status(200).json(mapToAuthResponse(userWithSession));
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }
}
