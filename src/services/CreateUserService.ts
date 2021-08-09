import IUserRepository from '../repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';

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

  public async execute({ name, email, password }: Request) {
    const user = await this.userRepository.create({
      name,
      email,
      password,
    });
  }
}

export default CreateUserService;
