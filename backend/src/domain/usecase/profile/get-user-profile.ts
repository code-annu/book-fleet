import { UserProfile, UserProfileCreate } from "../../entity/user-profile";
import { IUserProfileRepository } from "../../repository/iuser-profile-repository";

export class GetUserProfile {
  constructor(private readonly userProfileRepository: IUserProfileRepository) {}

  async execute(uid: string): Promise<UserProfile|null> {
    return this.userProfileRepository.getUserProfile(uid);
  }
}
