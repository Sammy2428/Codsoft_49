import React from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - would come from API
  const recentQuizzes = [
    { id: 1, title: 'JavaScript Basics', score: 85, date: '2024-01-15' },
    { id: 2, title: 'General Knowledge', score: 72, date: '2024-01-14' },
    { id: 3, title: 'Science Quiz', score: 90, date: '2024-01-12' }
  ];

  const myQuizzes = [
    { id: 1, title: 'My JavaScript Quiz', plays: 15, rating: 4.5 },
    { id: 2, title: 'Programming Fundamentals', plays: 8, rating: 4.2 }
  ];

  return (
    <Container className="my-4">
      <div className="mb-4">
        <h1>Dashboard</h1>
        {user && (
          <p className="lead">Welcome back, {user.username}! Ready to learn something new?</p>
        )}
      </div>

      {/* Quick Actions */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="h-100 text-center">
            <Card.Body>
              <Card.Title>Create Quiz</Card.Title>
              <Card.Text>
                Build your own custom quiz with multiple questions and options
              </Card.Text>
              <Button variant="primary" href="/create-quiz" className="w-100">
                Create New Quiz
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-3">
          <Card className="h-100 text-center">
            <Card.Body>
              <Card.Title>Browse Quizzes</Card.Title>
              <Card.Text>
                Explore and take quizzes created by other users in the community
              </Card.Text>
              <Button variant="success" href="/quizzes" className="w-100">
                Browse Quizzes
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-3">
          <Card className="h-100 text-center">
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>
                View your quiz history, statistics, and manage your account
              </Card.Text>
              <Button variant="info" href="/profile" className="w-100">
                View Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity and My Quizzes */}
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Quiz Results</h5>
            </Card.Header>
            <Card.Body>
              {recentQuizzes.map(quiz => (
                <div key={quiz.id} className="border-bottom pb-2 mb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{quiz.title}</strong>
                      <div className="text-muted small">
                        Taken on {new Date(quiz.date).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge bg={quiz.score >= 80 ? 'success' : quiz.score >= 60 ? 'warning' : 'danger'}>
                      {quiz.score}%
                    </Badge>
                  </div>
                  <ProgressBar 
                    now={quiz.score} 
                    variant={quiz.score >= 80 ? 'success' : quiz.score >= 60 ? 'warning' : 'danger'}
                    className="mt-1"
                  />
                </div>
              ))}
              {recentQuizzes.length === 0 && (
                <p className="text-muted text-center">No quiz results yet. Take your first quiz!</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">My Created Quizzes</h5>
            </Card.Header>
            <Card.Body>
              {myQuizzes.map(quiz => (
                <div key={quiz.id} className="border-bottom pb-2 mb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{quiz.title}</strong>
                      <div className="text-muted small">
                        {quiz.plays} plays • ⭐ {quiz.rating}
                      </div>
                    </div>
                    <Button variant="outline-primary" size="sm" href={`/quiz/${quiz.id}`}>
                      View
                    </Button>
                  </div>
                </div>
              ))}
              {myQuizzes.length === 0 && (
                <div className="text-center">
                  <p className="text-muted">You haven't created any quizzes yet.</p>
                  <Button variant="primary" href="/create-quiz">
                    Create Your First Quiz
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;