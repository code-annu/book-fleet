import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../util/jwt-util";
import { IUserRepository } from "../../repository/iuser-repository";
import { UserWithSession } from "./output";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";

export class RefreshToken {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(token: string): Promise<UserWithSession> {
    const decodedData = verifyRefreshToken(token);
    const user = await this.userRepository.getUserByUid(decodedData.userId);

    if (user == null) {
      throw new CustomError(
        `User not found! Account my be deleted or deactivated`,
        ErrorType.NOT_FOUND
      );
    }

    if (user.refresh_token != token) {
      throw new CustomError("Refresh token not found!", ErrorType.UNAUTHORIZED);
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
