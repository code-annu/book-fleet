export interface User {
  uid: string;
  email: string;
  created_at: string;
  readonly password_hash: string;
  refresh_token?: string;
}
