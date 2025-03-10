import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

// Get all thoughts
export const getAllThoughts = async (_: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);

    // Push the thought ID to the associated user's thoughts array
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: thought._id },
    });

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Delete a thought by ID
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Remove the thought from the associated user's thoughts array
    await User.findByIdAndUpdate(thought.username, {
      $pull: { thoughts: thought._id },
    });

    return res.json({ message: 'Thought deleted' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};
