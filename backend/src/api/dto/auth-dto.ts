export interface AuthResponse {
  user: {
    uid: string;
    email: string;
    created_at: string;
  };
  access_token: string;
  refresh_token: string;
}
