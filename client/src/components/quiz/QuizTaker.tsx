import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, ProgressBar, Alert, Badge } from 'react-bootstrap';
import { quizAPI } from '../../services/api';
import { useParams } from 'react-router-dom';

// Mock quiz data for testing
const mockQuiz = {
  id: 1,
  title: 'JavaScript Basics',
  description: 'Test your JavaScript knowledge',
  questions: [
    {
      questionText: 'What is JavaScript?',
      options: ['A programming language', 'A coffee brand', 'A type of script', 'A movie'],
      correctAnswer: 0,
      explanation: 'JavaScript is a programming language used for web development.'
    },
    {
      questionText: 'Which company created JavaScript?',
      options: ['Microsoft', 'Netscape', 'Google', 'Apple'],
      correctAnswer: 1,
      explanation: 'JavaScript was created by Netscape in 1995.'
    }
  ]
};

const QuizTaker: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // Temporarily use mock data until backend is fixed
    const loadQuiz = async () => {
      try {
        setLoading(true);
        // Try to get from backend first
        const response = await quizAPI.getQuiz(Number(id));
        setQuiz(response.data.data);
      } catch (err) {
        console.log('Using mock data - Backend not ready');
        setQuiz(mockQuiz); // Use mock data if backend fails
      } finally {
        setLoading(false);
        setAnswers(new Array(mockQuiz.questions.length).fill(-1));
      }
    };

    loadQuiz();
  }, [id]);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    if (!quiz) return { score: 0, correct: 0, total: 0 };
    
    let correct = 0;
    quiz.questions.forEach((question: any, index: number) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / quiz.questions.length) * 100);
    return { score, correct, total: quiz.questions.length };
  };

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" href="/quizzes">Back to Quizzes</Button>
      </Container>
    );
  }

  if (!quiz) {
    return (
      <Container className="my-4">
        <Alert variant="warning">Quiz not found</Alert>
        <Button variant="primary" href="/quizzes">Back to Quizzes</Button>
      </Container>
    );
  }

  if (quizCompleted) {
    const { score, correct, total } = calculateScore();

    return (
      <Container className="my-4">
        <Card>
          <Card.Body className="text-center">
            <h2>Quiz Completed! 🎉</h2>
            <div className="mb-4">
              <h3 className={score >= 70 ? 'text-success' : 'text-danger'}>
                Score: {score}%
              </h3>
              <p className="lead">
                You got {correct} out of {total} questions correct
              </p>
            </div>

            <div className="mt-4">
              <Button variant="primary" href="/quizzes" className="me-2">
                Take Another Quiz
              </Button>
              <Button variant="outline-secondary" href="/">
                Go Home
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <Container className="my-4">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h3>{quiz.title}</h3>
            <div>Question {currentQuestion + 1} of {quiz.questions.length}</div>
          </div>
          <ProgressBar now={progress} className="mt-2" />
        </Card.Header>
        
        <Card.Body>
          <h5 className="mb-4">{question.questionText}</h5>
          
          <Form>
            {question.options.map((option: string, index: number) => (
              <Form.Check
                key={index}
                type="radio"
                id={`option-${index}`}
                name="quiz-answer"
                label={option}
                checked={answers[currentQuestion] === index}
                onChange={() => handleAnswerSelect(index)}
                className="mb-3 p-3 border rounded"
                style={{ cursor: 'pointer' }}
              />
            ))}
          </Form>

          <div className="d-flex justify-content-between mt-4">
            <Button 
              variant="outline-secondary" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </Button>
            
            <Button 
              variant="primary" 
              onClick={handleNext}
              disabled={answers[currentQuestion] === -1}
            >
              {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next →'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default QuizTaker;