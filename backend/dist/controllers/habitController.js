"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHabit = exports.updateHabit = exports.getHabitById = exports.getHabits = exports.createHabit = void 0;
const database_1 = __importDefault(require("../config/database"));
const createHabit = async (req, res) => {
    try {
        const { title, description, color, icon, frequency, target_days } = req.body;
        const userId = req.userId;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const result = await database_1.default.query(`INSERT INTO habits (user_id, title, description, color, icon, frequency, target_days) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [userId, title, description, color, icon, frequency || 'daily', target_days || 30]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Create habit error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createHabit = createHabit;
const getHabits = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await database_1.default.query(`SELECT h.*, 
              COUNT(DISTINCT hl.completed_date) as total_completions,
              MAX(hl.completed_date) as last_completed
       FROM habits h
       LEFT JOIN habit_logs hl ON h.id = hl.habit_id
       WHERE h.user_id = $1
       GROUP BY h.id
       ORDER BY h.created_at DESC`, [userId]);
        // Calculate streak for each habit
        const habits = await Promise.all(result.rows.map(async (habit) => {
            const streak = await calculateStreak(habit.id);
            return { ...habit, current_streak: streak };
        }));
        res.json(habits);
    }
    catch (error) {
        console.error('Get habits error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getHabits = getHabits;
const getHabitById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const result = await database_1.default.query('SELECT * FROM habits WHERE id = $1 AND user_id = $2', [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        const streak = await calculateStreak(parseInt(id));
        const habit = { ...result.rows[0], current_streak: streak };
        res.json(habit);
    }
    catch (error) {
        console.error('Get habit error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getHabitById = getHabitById;
const updateHabit = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, color, icon, frequency, target_days } = req.body;
        const userId = req.userId;
        const result = await database_1.default.query(`UPDATE habits 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           color = COALESCE($3, color),
           icon = COALESCE($4, icon),
           frequency = COALESCE($5, frequency),
           target_days = COALESCE($6, target_days)
       WHERE id = $7 AND user_id = $8
       RETURNING *`, [title, description, color, icon, frequency, target_days, id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Update habit error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.updateHabit = updateHabit;
const deleteHabit = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const result = await database_1.default.query('DELETE FROM habits WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        res.json({ message: 'Habit deleted successfully' });
    }
    catch (error) {
        console.error('Delete habit error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.deleteHabit = deleteHabit;
// Helper function to calculate streak
const calculateStreak = async (habitId) => {
    const logs = await database_1.default.query(`SELECT completed_date 
     FROM habit_logs 
     WHERE habit_id = $1 
     ORDER BY completed_date DESC`, [habitId]);
    if (logs.rows.length === 0)
        return 0;
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < logs.rows.length; i++) {
        const logDate = new Date(logs.rows[i].completed_date);
        logDate.setHours(0, 0, 0, 0);
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);
        if (logDate.getTime() === expectedDate.getTime()) {
            streak++;
        }
        else {
            break;
        }
    }
    return streak;
};
