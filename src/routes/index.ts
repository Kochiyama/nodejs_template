import { Request, Response, Router } from 'express';
import userRoutes from './user';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (req: Request, res: Response) =>
  res.json({
    name: 'Marcelo',
    lastname: 'HK',
    age: 17,
  }),
);

routes.use(`${prefixRoutes}/users`, userRoutes);

export default routes;
