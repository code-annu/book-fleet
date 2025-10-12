import { UserProfile, UserProfileCreate } from "../../entity/user-profile";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserProfileRepository } from "../../repository/iuser-profile-repository";
import { IUserRepository } from "../../repository/iuser-repository";

export class DeleteUser {
  constructor(
    private readonly userProfileRepository: IUserProfileRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(uid: string): Promise<UserProfile> {
    const user = await this.userProfileRepository.getUserProfile(uid);
    if (user == null) {
      throw new CustomError("You don't have any profile.", ErrorType.NOT_FOUND);
    }
    await this.userRepository.deleteUser(uid);
    return user;
  }
}
