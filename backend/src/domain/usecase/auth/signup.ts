import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../util/jwt-util";
import { IAuthRepository } from "../../repository/iauth-repository";
import bcrypt from "bcrypt";
import { UserWithSession } from "./output";
import { AuthUserCreate, UserRole } from "../../entity/auth";

const SALT_ROUNDS = 10;

export class Signup {
  constructor(private readonly userRepository: IAuthRepository) {}

  async execute(
    email: string,
    password: string,
    role: UserRole
  ): Promise<UserWithSession> {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await this.userRepository.createNewAuthUser({
      email: email,
      password_hash: hashedPassword,
      role: role,
    });

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
      role: role,
    };
  }
}
