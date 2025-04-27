import express from 'express';
import { generateQuiz, submitQuiz, getPastQuizzes } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateQuiz);
router.post('/submit', protect, submitQuiz);
router.get('/history', protect, getPastQuizzes);

export default router;
