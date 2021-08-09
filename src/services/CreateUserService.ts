import IUserRepository from '../repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import { hash } from 'bcrypt';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ name, email, password }: Request): Promise<User> {
    const passwordHash = await hash(password, 8);

    const alreadyExists = await this.userRepository.findByEmail(email);

    if (alreadyExists) {
      throw new AppError(
        'Usuario já existe, tente logar com suas credenciais',
        401,
      );
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export default CreateUserService;
