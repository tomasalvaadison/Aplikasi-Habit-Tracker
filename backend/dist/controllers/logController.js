"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistics = exports.getLogsForDate = exports.getHabitLogs = exports.toggleLog = void 0;
const database_1 = __importDefault(require("../config/database"));
const toggleLog = async (req, res) => {
    try {
        const { habitId } = req.params;
        const { date, notes } = req.body;
        const userId = req.userId;
        // Verify habit belongs to user
        const habitCheck = await database_1.default.query('SELECT * FROM habits WHERE id = $1 AND user_id = $2', [habitId, userId]);
        if (habitCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        const logDate = date || new Date().toISOString().split('T')[0];
        // Check if log exists
        const existingLog = await database_1.default.query('SELECT * FROM habit_logs WHERE habit_id = $1 AND completed_date = $2', [habitId, logDate]);
        if (existingLog.rows.length > 0) {
            // Delete log (uncheck)
            await database_1.default.query('DELETE FROM habit_logs WHERE habit_id = $1 AND completed_date = $2', [habitId, logDate]);
            return res.json({ message: 'Log removed', checked: false });
        }
        else {
            // Create log (check)
            const result = await database_1.default.query('INSERT INTO habit_logs (habit_id, completed_date, notes) VALUES ($1, $2, $3) RETURNING *', [habitId, logDate, notes]);
            return res.status(201).json({ log: result.rows[0], checked: true });
        }
    }
    catch (error) {
        console.error('Toggle log error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.toggleLog = toggleLog;
const getHabitLogs = async (req, res) => {
    try {
        const { habitId } = req.params;
        const userId = req.userId;
        // Verify habit belongs to user
        const habitCheck = await database_1.default.query('SELECT * FROM habits WHERE id = $1 AND user_id = $2', [habitId, userId]);
        if (habitCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        const result = await database_1.default.query('SELECT * FROM habit_logs WHERE habit_id = $1 ORDER BY completed_date DESC', [habitId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Get logs error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getHabitLogs = getHabitLogs;
const getLogsForDate = async (req, res) => {
    try {
        const { date } = req.params;
        const userId = req.userId;
        const result = await database_1.default.query(`SELECT hl.*, h.title, h.color 
       FROM habit_logs hl
       JOIN habits h ON hl.habit_id = h.id
       WHERE h.user_id = $1 AND hl.completed_date = $2
       ORDER BY hl.created_at DESC`, [userId, date]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Get logs for date error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getLogsForDate = getLogsForDate;
const getStatistics = async (req, res) => {
    try {
        const userId = req.userId;
        // Total habits
        const totalHabits = await database_1.default.query('SELECT COUNT(*) as count FROM habits WHERE user_id = $1', [userId]);
        // Total completions
        const totalCompletions = await database_1.default.query(`SELECT COUNT(*) as count FROM habit_logs hl
       JOIN habits h ON hl.habit_id = h.id
       WHERE h.user_id = $1`, [userId]);
        // Completions this month
        const thisMonth = await database_1.default.query(`SELECT COUNT(*) as count FROM habit_logs hl
       JOIN habits h ON hl.habit_id = h.id
       WHERE h.user_id = $1 
       AND DATE_TRUNC('month', hl.completed_date) = DATE_TRUNC('month', CURRENT_DATE)`, [userId]);
        // Last 7 days activity
        const last7Days = await database_1.default.query(`SELECT hl.completed_date, COUNT(*) as count
       FROM habit_logs hl
       JOIN habits h ON hl.habit_id = h.id
       WHERE h.user_id = $1 
       AND hl.completed_date >= CURRENT_DATE - INTERVAL '7 days'
       GROUP BY hl.completed_date
       ORDER BY hl.completed_date`, [userId]);
        res.json({
            totalHabits: parseInt(totalHabits.rows[0].count),
            totalCompletions: parseInt(totalCompletions.rows[0].count),
            thisMonth: parseInt(thisMonth.rows[0].count),
            last7Days: last7Days.rows,
        });
    }
    catch (error) {
        console.error('Get statistics error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getStatistics = getStatistics;
