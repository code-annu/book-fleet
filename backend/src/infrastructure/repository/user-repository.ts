import { User } from "../../domain/entity/user";
import { IUserRepository } from "../../domain/repository/iuser-repository";
import { BaseRepository } from "./base-repository";
import { CustomError } from "../../domain/error/custom-error";
import { ErrorType } from "../../domain/error/error-type";

const AUTH_TABLE = "auth";

export class UserRepository extends BaseRepository implements IUserRepository {
  constructor() {
    super(AUTH_TABLE);
  }

  async createUser(email: string, password_hash: string): Promise<User> {
    const { data, error } = await super.insert({
      email,
      password_hash,
    });

    if (error) {
      switch (error.code) {
        case "23505":
          throw new CustomError(
            "Email already exists",
            ErrorType.RESOURCE_ALREADY_EXISTS
          );
        default:
          throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
      }
    }
    return data as User;
  }

  async getUserByUid(uid: string): Promise<User | null> {
    const { data, error } = await super.getByUid(uid);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as User;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await super.getByKey("email", email);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as User;
  }

  async updateUserRefreshToken(
    uid: string,
    refreshToken: string
  ): Promise<User | null> {
    const { data, error } = await super.update(uid, {
      refresh_token: refreshToken,
    });

    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }

    return data as User;
  }
}
