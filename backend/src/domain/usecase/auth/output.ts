import { AuthUser, UserRole } from "../../entity/auth";

export interface UserWithSession {
  user: AuthUser;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
}
