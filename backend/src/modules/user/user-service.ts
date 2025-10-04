import { UserRepository } from "./user-repository";
import { UserCreateDTO, UserUpdateDTO } from "./user-dto";
import { mapToUserResponse } from "./user-mapper";
import { UserResponse } from "./user-response";

export class UserService {
  private userRepository = new UserRepository();

  async createUserProfile(userCreateDto: UserCreateDTO): Promise<UserResponse> {
    const user = await this.userRepository.createUser(userCreateDto);
    return mapToUserResponse(user);
  }

  async getUserProfile(id: string): Promise<UserResponse | null> {
    const user = await this.userRepository.getUserById(id);
    return user ? mapToUserResponse(user) : null;
  }

  async updateUserProfile(
    id: string,
    userUpdateDTO: UserUpdateDTO
  ): Promise<UserResponse> {
    const user = await this.userRepository.updateUserById(id, userUpdateDTO);
    return mapToUserResponse(user);
  }

  async deleteUserProfile(id: string): Promise<UserResponse> {
    const user = await this.userRepository.deleteUserById(id);
    return mapToUserResponse(user);
  }
}
