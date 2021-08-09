import { CreateUserDTO } from '../dtos/CreateUserDTO';
import User from '../models/User';

export default interface IUserRepository {
  findByEmail: (email: string) => Promise<User | undefined>;
  create: (createUserDto: CreateUserDTO) => Promise<User>;
}
