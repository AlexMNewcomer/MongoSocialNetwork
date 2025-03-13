import { Router } from 'express';
const router = Router();
import apiRoutes from './thoughtRoutes.js';

router.use('/api', apiRoutes);

router.use((_req, res) => {
  return res.send('Wrong route!');
});

export default router;
export { default as User } from '../../models/User.js';
export { default as Thought } from '../../models/Thought.js';
export { default as Reaction } from '../../models/Reaction.js';
