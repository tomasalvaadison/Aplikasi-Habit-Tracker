-- Create Database
CREATE DATABASE habit_tracker;

-- Connect to database
\c habit_tracker;

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Habits Table
CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3B82F6',
  icon VARCHAR(50) DEFAULT 'star',
  frequency VARCHAR(20) DEFAULT 'daily',
  target_days INTEGER DEFAULT 30,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Habit Logs Table
CREATE TABLE habit_logs (
  id SERIAL PRIMARY KEY,
  habit_id INTEGER REFERENCES habits(id) ON DELETE CASCADE,
  completed_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(habit_id, completed_date)
);

-- Quotes Table
CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  author VARCHAR(100)
);

-- Create indexes for better performance
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_habit_logs_habit_id ON habit_logs(habit_id);
CREATE INDEX idx_habit_logs_date ON habit_logs(completed_date);

-- Insert sample quotes
INSERT INTO quotes (text, author) VALUES
('Success is the sum of small efforts repeated day in and day out.', 'Robert Collier'),
('You will never change your life until you change something you do daily.', 'John C. Maxwell'),
('Motivation is what gets you started. Habit is what keeps you going.', 'Jim Ryun'),
('We are what we repeatedly do. Excellence, then, is not an act, but a habit.', 'Aristotle'),
('The secret of getting ahead is getting started.', 'Mark Twain');
