const express = require('express');
const router = express.Router();

// Temporary storage
let quizzes = [];
let quizIdCounter = 1;

// Get all quizzes
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: quizzes,
    count: quizzes.length
  });
});

// Create new quiz
router.post('/', (req, res) => {
  try {
    const { title, description, category, questions } = req.body;
    
    const newQuiz = {
      id: quizIdCounter++,
      title,
      description,
      category,
      questions,
      createdAt: new Date().toISOString()
    };
    
    quizzes.push(newQuiz);
    
    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      data: newQuiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating quiz'
    });
  }
});

// Get single quiz
router.get('/:id', (req, res) => {
  const quizId = parseInt(req.params.id);
  const quiz = quizzes.find(q => q.id === quizId);
  
  if (!quiz) {
    return res.status(404).json({
      success: false,
      message: 'Quiz not found'
    });
  }
  
  res.json({
    success: true,
    data: quiz
  });
});

module.exports = router;