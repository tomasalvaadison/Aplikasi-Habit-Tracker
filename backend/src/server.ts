import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import habitRoutes from './routes/habitRoutes';
import logRoutes from './routes/logRoutes';
import quoteRoutes from './routes/quoteRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/quotes', quoteRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Habit Tracker API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});