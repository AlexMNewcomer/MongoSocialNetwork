import { Router } from 'express';
const router = Router();
import appRoutes from './reactionRoutes';
import userRoutes from './userRoutes';



router.use('/apps', appRoutes);
router.use('/users', userRoutes);

export default router;
