import { Router } from 'express';
import {
  createHabit,
  getHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
} from '../controllers/habitController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, createHabit);
router.get('/', authenticate, getHabits);
router.get('/:id', authenticate, getHabitById);
router.put('/:id', authenticate, updateHabit);
router.delete('/:id', authenticate, deleteHabit);

export default router;