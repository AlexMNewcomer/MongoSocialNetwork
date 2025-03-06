import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
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

// Route: /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)     // POST to add a friend to a user's friend list
  .delete(removeFriend); // DELETE to remove a friend from a user's friend list

export default router;
