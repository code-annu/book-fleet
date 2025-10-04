import { validateRequestBody } from "../../middleware/validate-request-body";
import { UserController } from "./user-controller";
import { Router } from "express";
import { createUserProfileSchema } from "./user-schema";

export const userRouter = Router({ mergeParams: true });
const userController = new UserController();

userRouter.post(
  "/:id",
  validateRequestBody(createUserProfileSchema),
  userController.postProfile.bind(userController)
);
