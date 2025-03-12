import { Router } from 'express';
const router = Router();
import apiRoutes from '../routes/api/thoughtRoutes';

router.use('/api', apiRoutes);

router.use((_req, res) => {
  return res.send('Wrong route!');
});

export default router;
export { default as User } from './User';
export { default as Thought } from './Thought';
export { default as Reaction } from './Reaction';
