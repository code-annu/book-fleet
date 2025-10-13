import { UserRole } from "../../domain/entity/auth";

export interface AuthResponse {
  user: {
    uid: string;
    email: string;
    created_at: string;
    role: UserRole;
  };
  access_token: string;
  refresh_token: string;
}
