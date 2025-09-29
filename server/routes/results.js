const express = require('express');
const QuizResult = require('../models/QuizResult');
const router = express.Router();

// Save quiz result
router.post('/', async (req, res) => {
  try {
    const { quizId, userId, score, totalQuestions, correctAnswers, answers, timeTaken } = req.body;

    const quizResult = await QuizResult.create({
      quiz: quizId,
      user: userId,
      score,
      totalQuestions,
      correctAnswers,
      answers,
      timeTaken
    });

    res.status(201).json({
      success: true,
      message: 'Quiz result saved successfully',
      data: quizResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving quiz result',
      error: error.message
    });
  }
});

// Get user's quiz results
router.get('/user/:userId', async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.params.userId })
      .populate('quiz', 'title category')
      .sort({ completedAt: -1 });

    res.json({
      success: true,
      data: results,
      count: results.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz results',
      error: error.message
    });
  }
});

module.exports = router;