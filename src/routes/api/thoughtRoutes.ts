import express, { Request, Response } from 'express';

import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtController';

const router = express.Router();

// Route to get all thoughts
router.get('/thoughts', async (req: Request, res: Response) => {
  try {
    const thoughts = await getAllThoughts(req, res);
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a thought by ID
router.get('/thoughts/:thoughtId', async (req: Request, res: Response) => {
  try {
    const thought = await getThoughtById(req, res);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Route to create a new thought
router.post('/thoughts', async (req: Request, res: Response) => {
  try {
    const thought = await createThought(req, res);
    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a thought
router.put('/thoughts/:thoughtId', async (req: Request, res: Response) => {
  try {
    const thought = await updateThought(req, res);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Route to delete a thought
router.delete('/thoughts/:thoughtId', async (req: Request, res: Response) => {
  try {
    const thought = await deleteThought(req, res);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json({ message: 'Thought deleted' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Route to add a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req: Request, res: Response) => {
  try {
    const reaction = await addReaction(req, res);
    res.status(201).json(reaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to remove a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req: Request, res: Response) => {
  try {
    const reaction = await removeReaction(req, res);
    res.json(reaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
