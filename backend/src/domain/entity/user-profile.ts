import { UserRole } from "./auth";

export interface UserProfile {
  uid: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  address: string;
  profile_picture_url: string;
  created_at: string;
}

export interface UserProfileCreate
  extends Pick<
    UserProfile,
    | "email"
    | "address"
    | "first_name"
    | "last_name"
    | "profile_picture_url"
    | "role"
  > {}

export interface UserProfileUpdate extends Partial<UserProfileCreate> {}
