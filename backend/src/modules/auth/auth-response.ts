export interface AuthenticationResponse {
  user: {
    id: string;
    email: string;
    created_at: string;
  };
  session: {
    access_token: string;
    expires_at?: number | undefined;
    expires_in: number;
    refresh_token: string;
  };
}
