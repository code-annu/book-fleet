import { User } from "../entity/user";

export interface IUserRepository {
  createUser(email: string, password_hash: string): Promise<User>;
  getUserByUid(uid: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUserRefreshToken(
    uid: string,
    refreshToken: string
  ): Promise<User | null>;

  deleteUser(uid: string): Promise<User | null>;
}
