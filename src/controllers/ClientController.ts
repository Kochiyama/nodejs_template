import { Request, Response } from 'express';
import UserRepository from '../repositories/user/UserRepository';
import CreateSessionService from '../services/session/CreateSessionService';

class ClientController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const createSessionService = new CreateSessionService(userRepository);

    const session = await createSessionService.execute({ email, password });

    return response.json(session);
  }
}

export default ClientController;
