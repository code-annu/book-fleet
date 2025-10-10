import {
  UserProfile,
  UserProfileCreate,
  UserProfileUpdate,
} from "../entity/user-profile";

export interface IUserProfileRepository {
  createUserProfile(
    uid: string,
    userProfileCreate: UserProfileCreate
  ): Promise<UserProfile>;
  getUserProfile(uid: string): Promise<UserProfile | null>;
  updateUserProfile(
    uid: string,
    updates: UserProfileUpdate
  ): Promise<UserProfile | null>;

  deleteUserProfile(uid: string): Promise<UserProfile | null>;
}
