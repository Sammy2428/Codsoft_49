import React from 'react';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';

const QuizList: React.FC = () => {
  const quizzes = [
    {
      id: 1,
      title: 'JavaScript Basics',
      description: 'Test your JavaScript knowledge',
      category: 'Programming',
      questionCount: 5,
    },
    {
      id: 2,
      title: 'General Knowledge',
      description: 'Test your general knowledge',
      category: 'General Knowledge',
      questionCount: 10,
    }
  ];

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Quizzes</h2>
        <Button variant="primary" href="/create-quiz">
          Create New Quiz
        </Button>
      </div>

      <Row>
        {quizzes.map(quiz => (
          <Col md={6} key={quiz.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
                <div className="mb-2">
                  <Badge bg="secondary" className="me-2">{quiz.category}</Badge>
                  <Badge bg="info">{quiz.questionCount} questions</Badge>
                </div>
                <div className="mt-3">
                  <Button variant="success" href={`/quiz/${quiz.id}`}>
                    Take Quiz
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default QuizList;