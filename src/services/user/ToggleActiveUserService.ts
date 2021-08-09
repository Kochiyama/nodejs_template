import IUserRepository from '../../repositories/IUserRepository';
import UserRepository from '../../repositories/UserRepository';
import { hash } from 'bcrypt';
import User from '../../models/User';
import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class ToggleActiveUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ id }: Request): Promise<User> {
    if (id.length != 36) {
      throw new AppError('Id inválido', 400);
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 401);
    }

    user.active = !user.active;

    await this.userRepository.save(user);

    return user;
  }
}

export default ToggleActiveUserService;
