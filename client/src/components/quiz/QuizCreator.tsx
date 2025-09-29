import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
 
// Temporary mock API until we create the services
const mockQuizAPI = {
  createQuiz: async (quizData: any) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true, message: 'Quiz created!' } });
      }, 1000);
    });
  }
};

const QuizCreator: React.FC = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    category: '',
    questions: [
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      }
    ]
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          questionText: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: ''
        }
      ]
    });
  };

  const removeQuestion = (index: number) => {
    const questions = quizData.questions.filter((_, i) => i !== index);
    setQuizData({ ...quizData, questions });
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const questions = [...quizData.questions];
    questions[index] = { ...questions[index], [field]: value };
    setQuizData({ ...quizData, questions });
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const questions = [...quizData.questions];
    questions[qIndex].options[oIndex] = value;
    setQuizData({ ...quizData, questions });
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const response = await mockQuizAPI.createQuiz(quizData);
    setMessage('Quiz created successfully!');
    // Reset form
    setQuizData({
      title: '',
      description: '',
      category: '',
      questions: [
        {
          questionText: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: ''
        }
      ]
    });
  } catch (error) {
    setMessage('Error creating quiz. Please try again.');
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Container className="my-4">
      <h2>Create New Quiz</h2>
      {message && (
        <Alert variant={message.includes('Error') ? 'danger' : 'success'}>
          {message}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            type="text"
            value={quizData.title}
            onChange={(e) => setQuizData({...quizData, title: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={quizData.description}
            onChange={(e) => setQuizData({...quizData, description: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={quizData.category}
            onChange={(e) => setQuizData({...quizData, category: e.target.value})}
            required
          >
            <option value="">Select Category</option>
            <option value="General Knowledge">General Knowledge</option>
            <option value="Science">Science</option>
            <option value="Programming">Programming</option>
            <option value="Mathematics">Mathematics</option>
          </Form.Select>
        </Form.Group>

        <h4>Questions</h4>
        {quizData.questions.map((question, qIndex) => (
          <Card key={qIndex} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Question {qIndex + 1}</h5>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeQuestion(qIndex)}
                  disabled={quizData.questions.length === 1}
                >
                  Remove
                </Button>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Question Text</Form.Label>
                <Form.Control
                  type="text"
                  value={question.questionText}
                  onChange={(e) => updateQuestion(qIndex, 'questionText', e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Label>Options</Form.Label>
              {question.options.map((option, oIndex) => (
                <Form.Group key={oIndex} className="mb-2">
                  <div className="d-flex align-items-center">
                    <Form.Check
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={question.correctAnswer === oIndex}
                      onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                      className="me-2"
                    />
                    <Form.Control
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      required
                    />
                  </div>
                </Form.Group>
              ))}

              <Form.Group className="mb-3">
                <Form.Label>Explanation (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={question.explanation}
                  onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        ))}

        <div className="d-flex gap-2 mb-3">
          <Button variant="secondary" onClick={addQuestion}>
            Add Question
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Quiz'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default QuizCreator;