import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../util/jwt-util";
import { IUserRepository } from "../../repository/iuser-repository";
import bcrypt from "bcrypt";
import { UserWithSession } from "./output";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";

export class Login {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(email: string, password: string): Promise<UserWithSession> {
    const user = await this.userRepository.getUserByEmail(email);
    if (user == null) {
      throw new CustomError(
        `User with email ${email} not found! Try to signup`,
        ErrorType.NOT_FOUND
      );
    }
    const matched = await bcrypt.compare(password, user.password_hash);

    if (!matched) {
      throw new CustomError(
        "Invalid user password. Please try again",
        ErrorType.UNAUTHORIZED
      );
    }

    const accessToken = generateAccessToken({
      userId: user.uid,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user.uid,
      email: user.email,
    });

    await this.userRepository.updateUserRefreshToken(user.uid, refreshToken);

    return {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
