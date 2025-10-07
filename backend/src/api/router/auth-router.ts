import { Router } from "express";
import { AuthController } from "../controller/auth-controller";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  loginSchema,
  refreshTokenSchema,
  signupSchema,
} from "../schema/auth-schema";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  "/signup",
  validateRequestBody(signupSchema),
  authController.postSignup.bind(authController)
);

authRouter.post(
  "/login",
  validateRequestBody(loginSchema),
  authController.postLogin.bind(authController)
);

authRouter.post(
  "/refresh-token",
  validateRequestBody(refreshTokenSchema),
  authController.postRefreshToken.bind(authController)
);
