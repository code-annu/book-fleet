import { UserProfile, UserProfileUpdate } from "../../entity/user-profile";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserProfileRepository } from "../../repository/iuser-profile-repository";
import { IUserRepository } from "../../repository/iuser-repository";

export class UpdateUserProfile {
  constructor(
    private readonly userProfileRepository: IUserProfileRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(
    uid: string,
    updates: UserProfileUpdate
  ): Promise<UserProfile | null> {
    const user = await this.userRepository.getUserByUid(uid);
    if (!user)
      throw new CustomError(
        "User not found! Account may be deleted or deactivated",
        ErrorType.NOT_FOUND
      );
    return this.userProfileRepository.updateUserProfile(uid, updates);
  }
}
