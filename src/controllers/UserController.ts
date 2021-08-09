import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/user/CreateUserService';
import ToggleActiveUserService from '../services/user/ToggleActiveUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const createUserService = new CreateUserService(userRepository);

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  }

  public async toggleActive(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const userRepository = new UserRepository();
    const toggleActiveUserService = new ToggleActiveUserService(userRepository);

    const user = await toggleActiveUserService.execute({ id });

    return response.json(user);
  }
}

export default UserController;
