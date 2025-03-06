import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/userController';

const router = Router();

// Route: /api/users
router.route('/')
  .get(getAllUsers)   // GET all users
  .post(createUser);  // POST a new user

// Route: /api/users/:id
router.route('/:id')
  .get(getUserById)   // GET a single user by ID (populated with thoughts & friends)
  .put(updateUser)    // PUT to update a user by ID
  .delete(deleteUser);// DELETE a user by ID

export default router;
