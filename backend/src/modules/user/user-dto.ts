export interface UserDTO {
  id: string;
  email: string;
  first_name: string;
  full_name: string;
  role: string;
  address: string;
  profile_picture_url: string;
}

export interface UserCreateDTO extends UserDTO {}

export interface UserUpdateDTO extends Partial<Omit<UserDTO, "id" | "email">> {}
