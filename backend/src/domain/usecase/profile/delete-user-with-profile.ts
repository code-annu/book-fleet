import { UserProfile, UserProfileCreate } from "../../entity/user-profile";
import { IUserProfileRepository } from "../../repository/iuser-profile-repository";
import { IUserRepository } from "../../repository/iuser-repository";

export class DeleteUser {
  constructor(
    private readonly userProfileRepository: IUserProfileRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(uid: string): Promise<UserProfile | null> {
    const user = await this.userProfileRepository.getUserProfile(uid);
    await this.userRepository.deleteUser(uid);
    return user;
  }
}
