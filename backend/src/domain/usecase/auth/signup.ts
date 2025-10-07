import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../util/jwt-util";
import { IUserRepository } from "../../repository/iuser-repository";
import bcrypt from "bcrypt";
import { UserWithSession } from "./output";

const SALT_ROUNDS = 10;

export class Signup {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(email: string, password: string): Promise<UserWithSession> {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await this.userRepository.createUser(email, hashedPassword);

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
