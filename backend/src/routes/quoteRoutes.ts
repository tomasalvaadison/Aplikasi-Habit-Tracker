import { Router } from 'express';
import { getRandomQuote, seedQuotes } from '../controllers/quoteController';

const router = Router();

router.get('/random', getRandomQuote);
router.post('/seed', seedQuotes);

export default router;