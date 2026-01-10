import { Request, Response } from 'express';
import pool from '../config/database';

export const getRandomQuote = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1'
    );

    if (result.rows.length === 0) {
      return res.json({
        text: 'Success is the sum of small efforts repeated day in and day out.',
        author: 'Robert Collier',
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get quote error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const seedQuotes = async (req: Request, res: Response) => {
  try {
    const quotes = [
      {
        text: 'Success is the sum of small efforts repeated day in and day out.',
        author: 'Robert Collier',
      },
      {
        text: 'You will never change your life until you change something you do daily.',
        author: 'John C. Maxwell',
      },
      {
        text: 'Motivation is what gets you started. Habit is what keeps you going.',
        author: 'Jim Ryun',
      },
      {
        text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
        author: 'Aristotle',
      },
      {
        text: 'The secret of getting ahead is getting started.',
        author: 'Mark Twain',
      },
      {
        text: 'A journey of a thousand miles begins with a single step.',
        author: 'Lao Tzu',
      },
      {
        text: 'Small daily improvements over time lead to stunning results.',
        author: 'Robin Sharma',
      },
      {
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
      },
      {
        text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
        author: 'Winston Churchill',
      },
      {
        text: 'Your life does not get better by chance, it gets better by change.',
        author: 'Jim Rohn',
      },
    ];

    for (const quote of quotes) {
      await pool.query(
        'INSERT INTO quotes (text, author) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [quote.text, quote.author]
      );
    }

    res.json({ message: 'Quotes seeded successfully' });
  } catch (error) {
    console.error('Seed quotes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};