import { UserProfile } from "../../entity/user-profile";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserProfileRepository } from "../../repository/iuser-profile-repository";

export class GetUserProfile {
  constructor(private readonly userProfileRepository: IUserProfileRepository) {}

  async execute(uid: string): Promise<UserProfile> {
    const userProfile = await this.userProfileRepository.getUserProfile(uid);
    if (userProfile == null) {
      throw new CustomError(
        "User profile not found! Please create profile",
        ErrorType.NOT_FOUND
      );
    }
    return userProfile;
  }
}
