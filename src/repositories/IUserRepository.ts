import { CreateUserDTO } from '../dtos/CreateUserDTO';
import User from '../models/User';

export default interface IUserRepository {
  findById: (id: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  create: (createUserDto: CreateUserDTO) => Promise<User>;
  save: (user: User) => Promise<User>;
}
