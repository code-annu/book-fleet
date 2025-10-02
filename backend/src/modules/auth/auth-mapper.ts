import { Session, User } from "@supabase/supabase-js";
import { AuthenticationResponse } from "./auth-response";

export function mapToAuthenticationResponse(
  user: User,
  session: Session
): AuthenticationResponse {
  const response: AuthenticationResponse = {
    user: {
      id: user.id,
      email: user.email || "",
      created_at: user.created_at,
    },
    session: {
      access_token: session.access_token,
      expires_in: session.expires_in,
      expires_at: session.expires_at,
      refresh_token: session.refresh_token,
    },
  };

  return response;
}
