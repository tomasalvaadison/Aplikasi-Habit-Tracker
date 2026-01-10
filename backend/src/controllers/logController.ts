import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import pool from '../config/database';

export const toggleLog = async (req: AuthRequest, res: Response) => {
  try {
    const { habitId } = req.params;
    const { date, notes } = req.body;
    const userId = req.userId;

    // Verify habit belongs to user
    const habitCheck = await pool.query(
      'SELECT * FROM habits WHERE id = $1 AND user_id = $2',
      [habitId, userId]
    );

    if (habitCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const logDate = date || new Date().toISOString().split('T')[0];

    // Check if log exists
    const existingLog = await pool.query(
      'SELECT * FROM habit_logs WHERE habit_id = $1 AND completed_date = $2',
      [habitId, logDate]
    );

    if (existingLog.rows.length > 0) {
      // Delete log (uncheck)
      await pool.query(
        'DELETE FROM habit_logs WHERE habit_id = $1 AND completed_date = $2',
        [habitId, logDate]
      );
      return res.json({ message: 'Log removed', checked: false });
    } else {
      // Create log (check)
      const result = await pool.query(
        'INSERT INTO habit_logs (habit_id, completed_date, notes) VALUES ($1, $2, $3) RETURNING *',
        [habitId, logDate, notes]
      );
      return res.status(201).json({ log: result.rows[0], checked: true });
    }
  } catch (error) {
    console.error('Toggle log error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getHabitLogs = async (req: AuthRequest, res: Response) => {
  try {
    const { habitId } = req.params;
    const userId = req.userId;

    // Verify habit belongs to user
    const habitCheck = await pool.query(
      'SELECT * FROM habits WHERE id = $1 AND user_id = $2',
      [habitId, userId]
    );

    if (habitCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const result = await pool.query(
      'SELECT * FROM habit_logs WHERE habit_id = $1 ORDER BY completed_date DESC',
      [habitId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getLogsForDate = async (req: AuthRequest, res: Response) => {
  try {
    const { date } = req.params;
    const userId = req.userId;

    const result = await pool.query(
      `SELECT hl.*, h.title, h.color 
       FROM habit_logs hl
       JOIN habits h ON hl.habit_id = h.id
       WHERE h.user_id = $1 AND hl.completed_date = $2
       ORDER BY hl.created_at DESC`,
      [userId, date]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get logs for date error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getStatistics = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    // Total habits
    const totalHabits = await pool.query(
      'SELECT COUNT(*) as count FROM habits WHERE user_id = $1',
      [userId]
    );

    // Total completions
    const totalCompletions = await pool.query(
      `SELECT COUNT(*) as count FROM habit_logs hl
       JOIN habits h ON hl.habit_id = h.id
       WHERE h.user_id = $1`,
      [userId]
    );

    // Completions this month
    const thisMonth = await pool.query(
      `SELECT COUNT(*) as count FROM habit_logs hl
       JOIN habits h ON hl.habit_id = h.id
       WHERE h.user_id = $1 
       AND DATE_TRUNC('month', hl.completed_date) = DATE_TRUNC('month', CURRENT_DATE)`,
      [userId]
    );

    // Last 7 days activity
    const last7Days = await pool.query(
      `SELECT hl.completed_date, COUNT(*) as count
       FROM habit_logs hl
       JOIN habits h ON hl.habit_id = h.id
       WHERE h.user_id = $1 
       AND hl.completed_date >= CURRENT_DATE - INTERVAL '7 days'
       GROUP BY hl.completed_date
       ORDER BY hl.completed_date`,
      [userId]
    );

    res.json({
      totalHabits: parseInt(totalHabits.rows[0].count),
      totalCompletions: parseInt(totalCompletions.rows[0].count),
      thisMonth: parseInt(thisMonth.rows[0].count),
      last7Days: last7Days.rows,
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};