import IUserRepository from '../../repositories/IUserRepository';
import UserRepository from '../../repositories/UserRepository';
import User from '../../models/User';
import AppError from '../../errors/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

class CreateSessionService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new AppError('Credenciais invalidas', 401);
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new AppError('Credenciais invalidas', 401);
    }

    if (!user.active) {
      throw new AppError('Usuáio inativo', 401);
    }

    const token = sign({}, process.env.APP_SECRET as string, {
      expiresIn: '1d',
    });

    delete user.password;

    return {
      token,
      user,
    };
  }
}

export default CreateSessionService;
