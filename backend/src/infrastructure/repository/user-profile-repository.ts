import {
  UserProfileCreate,
  UserProfile,
  UserProfileUpdate,
} from "../../domain/entity/user-profile";
import { CustomError } from "../../domain/error/custom-error";
import { ErrorType } from "../../domain/error/error-type";
import { IUserProfileRepository } from "../../domain/repository/iuser-profile-repository";
import { BaseRepository } from "./base-repository";

const USERS_TABLE = "users";

export class UserProfileRepository
  extends BaseRepository
  implements IUserProfileRepository
{
  constructor() {
    super(USERS_TABLE);
  }

  async createUserProfile(
    uid: string,
    userProfileCreate: UserProfileCreate
  ): Promise<UserProfile> {
    const { data, error } = await super.insert({
      uid: uid,
      ...userProfileCreate,
    });
    if (error) {
      console.log(error);
      switch (error.code) {
        case "23505":
          throw new CustomError(
            "Profile already created",
            ErrorType.RESOURCE_ALREADY_EXISTS
          );
        default:
          throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
      }
    }

    return data as UserProfile;
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const { data, error } = await super.getByUid(uid);
    if (data == null) return null;
    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as UserProfile;
  }

  async updateUserProfile(
    uid: string,
    updates: UserProfileUpdate
  ): Promise<UserProfile | null> {
    const { data, error } = await super.update(uid, updates);
    if (data == null) return null;
    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as UserProfile;
  }

  async deleteUserProfile(uid: string): Promise<UserProfile | null> {
    const { data, error } = await super.delete(uid);
    if (data == null) return null;
    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }

    return data as UserProfile;
  }
}
