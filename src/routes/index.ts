import { Request, Response, Router } from 'express';
import sessionRoutes from './session';
import userRoutes from './user';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (req: Request, res: Response) =>
  res.json({ message: 'working!' })
);

routes.use(`${prefixRoutes}/users`, userRoutes);
routes.use(`${prefixRoutes}/sessions`, sessionRoutes);

export default routes;
