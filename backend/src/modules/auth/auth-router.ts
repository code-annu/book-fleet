import { Router } from "express";
import { AuthenticationController } from "./auth-controller";
import { validateRequestBody } from "../../middleware/validate-request-body";
import { loginSchema as signinSchema, signupSchema } from "./auth-schema";

export const authRouter = Router({ mergeParams: true });
const authController = new AuthenticationController();

authRouter.post(
  "/signup",
  validateRequestBody(signupSchema),
  authController.signupPost.bind(authController)
);

authRouter.post(
  "/signin",
  validateRequestBody(signinSchema),
  authController.signinPost.bind(authController)
);
