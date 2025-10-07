import { User } from "../../entity/user";

export interface UserWithSession {
  user: User;
  accessToken: string;
  refreshToken: string;
}
