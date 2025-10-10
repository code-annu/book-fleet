import { Router } from "express";
import { UserProfileController } from "../controller/user-profile-controller";
import { UserProfileRepository } from "../../infrastructure/repository/user-profile-repository";
import { UserRepository } from "../../infrastructure/repository/user-repository";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  userProfileCreateSchema,
  userProfileUpdateSchema,
} from "../schema/user-profile-schema";

export const userProfileRouter = Router({ mergeParams: true });
const userProfileController = new UserProfileController(
  new UserProfileRepository(),
  new UserRepository()
);

userProfileRouter.post(
  "/",
  validateRequestBody(userProfileCreateSchema),
  userProfileController.postUserProfile.bind(userProfileController)
);

userProfileRouter.get(
  "/",
  userProfileController.getProfile.bind(userProfileController)
);

userProfileRouter.patch(
  "/",
  validateRequestBody(userProfileUpdateSchema),
  userProfileController.patchProfile.bind(userProfileController)
);

userProfileRouter.delete(
  "/",
  userProfileController.deleteProfile.bind(userProfileController)
);
