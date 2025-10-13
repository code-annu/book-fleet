import { UserWithSession } from "../../domain/usecase/auth/output";
import { AuthResponse } from "../dto/auth-dto";

export function mapToAuthResponse(
  userWithSession: UserWithSession
): AuthResponse {
  const { uid, email, created_at, role } = userWithSession.user;
  const { refreshToken, accessToken } = userWithSession;
  const authResponse: AuthResponse = {
    user: {
      uid,
      email,
      created_at,
      role,
    },
    access_token: accessToken,
    refresh_token: refreshToken,
  };
  return authResponse;
}
