import { Response, Request } from "express";
import { CustomError } from "../../domain/error/custom-error";
import { IUserProfileRepository } from "../../domain/repository/iuser-profile-repository";
import { CreateUserProfile } from "../../domain/usecase/profile/create-user-profile";
import { GetUserProfile } from "../../domain/usecase/profile/get-user-profile";
import { UpdateUserProfile } from "../../domain/usecase/profile/update-user-profile";
import { DeleteUser } from "../../domain/usecase/profile/delete-user-with-profile";
import { IUserRepository } from "../../domain/repository/iuser-repository";
import { AuthRequest } from "../middleware/auth-middleware";

export class UserProfileController {
  private createProfile: CreateUserProfile;
  private getUserProfile: GetUserProfile;
  private updateProfile: UpdateUserProfile;
  private deleteUser: DeleteUser;

  constructor(
    userProfileRepository: IUserProfileRepository,
    userRepository: IUserRepository
  ) {
    this.createProfile = new CreateUserProfile(
      userProfileRepository,
      userRepository
    );
    this.getUserProfile = new GetUserProfile(userProfileRepository);
    this.updateProfile = new UpdateUserProfile(
      userProfileRepository,
      userRepository
    );
    this.deleteUser = new DeleteUser(userProfileRepository, userRepository);
  }

  async postUserProfile(req: AuthRequest, res: Response) {
    try {
      const data = req.body;
      const uid = req.auth!!.userId;
      const userProfile = await this.createProfile.execute(uid, data);
      res.status(201).json(userProfile);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async getProfile(req: AuthRequest, res: Response) {
    try {
      const uid = req.auth?.userId;

      const userProfile = await this.getUserProfile.execute(uid!);
      res.status(200).json(userProfile);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async patchProfile(req: AuthRequest, res: Response) {
    try {
      const data = req.body;
      const uid = req.auth?.userId;
      const userProfile = await this.updateProfile.execute(uid!, data);
      res.status(201).json(userProfile);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async deleteProfile(req: AuthRequest, res: Response) {
    try {
      const uid = req.auth?.userId;

      const userProfile = await this.deleteUser.execute(uid!);
      res.status(201).json(userProfile);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }
}
