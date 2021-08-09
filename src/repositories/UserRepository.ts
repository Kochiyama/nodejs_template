import { getRepository, Repository } from 'typeorm';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import User from '../models/User';
import IUserRepository from './IUserRepository';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }
  findByEmail: (email: string) => Promise<User> | undefined;

  public async async(email: string) {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create({ name, email, password }: CreateUserDTO) {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      active: true,
    });

    await this.ormRepository.save(user);

    return user;
  }
}

export default UserRepository;
