import { BaseRepository } from "../../shared/repository/base-repository";
import { UserCreateDTO, UserDTO, UserUpdateDTO } from "./user-dto";
import { User } from "./user-model";
import { supabaseClient } from "../../config/db";

const USERS_TABLE = "users";
const db = supabaseClient;

export class UserRepository extends BaseRepository<User, UserDTO> {
  constructor() {
    super(USERS_TABLE, db);
  }

  async createUser(userCreateDto: UserCreateDTO): Promise<User> {
    return super.insert(userCreateDto);
  }

  async getUserById(id: string): Promise<User | null> {
    return super.getById(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    const { data, error } = await this.db
      .from(this.table)
      .select("*")
      .eq("email", email)
      .single();
    if (error) {
      throw error;
    }
    return data as User;
  }

  async updateUserById(
    id: string,
    userUpdateDTO: UserUpdateDTO
  ): Promise<User> {
    return await super.updateById(id, userUpdateDTO);
  }

  async deleteUserById(id: string): Promise<User> {
    return super.deleteById(id);
  }

  async listUsers(ids: string[]): Promise<User[]> {
    return super.listByIds(ids);
  }
}
