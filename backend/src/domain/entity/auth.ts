export interface AuthUser {
  uid: string;
  email: string;
  created_at: string;
  role: UserRole;
  readonly password_hash: string;
  refresh_token?: string;
}

export interface AuthUserCreate
  extends Pick<AuthUser, "email" | "password_hash" | "role"> {}

export enum UserRole {
  USER = "user",
  DELIVERY_PARTNER = "delivery_partner",
}
