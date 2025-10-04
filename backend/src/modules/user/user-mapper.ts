import { User } from "./user-model";
import { UserResponse } from "./user-response";

export function mapToUserResponse(user: User): UserResponse {
  const userResponse: UserResponse = user;
  return userResponse;
}
