import { Request, Response } from 'express';
import User from '../models/User';
// import Thought from '../models/Thought';

// Get all users
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; 
    }

    res.json(user);
    return; 
  } catch (err) {
    res.status(500).json(err);
    return; 
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
    return; // Explicitly return
  } catch (err) {
    res.status(500).json(err);
    return; // Explicitly return
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Ensure function exits after sending response
    }

    res.json({ message: 'User deleted' });
    return; // Explicitly return
  } catch (err) {
    res.status(500).json(err);
    return; // Explicitly return
  }
};
// Add a friend
export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// Remove a friend
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};
