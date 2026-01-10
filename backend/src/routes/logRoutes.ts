import { Router } from 'express';
import {
  toggleLog,
  getHabitLogs,
  getLogsForDate,
  getStatistics,
} from '../controllers/logController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/:habitId/toggle', authenticate, toggleLog);
router.get('/:habitId', authenticate, getHabitLogs);
router.get('/date/:date', authenticate, getLogsForDate);
router.get('/stats/overview', authenticate, getStatistics);

export default router;