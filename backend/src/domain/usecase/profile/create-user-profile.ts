import { UserProfile, UserProfileCreate } from "../../entity/user-profile";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserProfileRepository } from "../../repository/iuser-profile-repository";
import { IAuthRepository } from "../../repository/iauth-repository";

export class CreateUserProfile {
  constructor(
    private readonly userProfileRepository: IUserProfileRepository,
    private readonly userRepository: IAuthRepository
  ) {}

  async execute(
    uid: string,
    userProfileData: UserProfileCreate
  ): Promise<UserProfile> {
    const user = await this.userRepository.getAuthUserByUid(uid);
    if (!user) throw new CustomError("User not found", ErrorType.NOT_FOUND);
    return this.userProfileRepository.createUserProfile(uid, {
      ...userProfileData,
      email: user.email,
    });
  }
}
