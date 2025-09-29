import React from 'react';
import { Container, Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container className="my-4">
        <div className="text-center">
          <h2>Please log in to view your profile</h2>
          <Button variant="primary" href="/login">Login</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">User Profile</h3>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Username:</strong>
                </Col>
                <Col sm={9}>
                  {user.username}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Email:</strong>
                </Col>
                <Col sm={9}>
                  {user.email}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Role:</strong>
                </Col>
                <Col sm={9}>
                  <Badge bg={user.role === 'admin' ? 'danger' : 'primary'}>
                    {user.role}
                  </Badge>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={3}>
                  <strong>Member Since:</strong>
                </Col>
                <Col sm={9}>
                  {new Date().toLocaleDateString()} {/* Would come from user data */}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Quiz Statistics */}
          <Card className="mt-4">
            <Card.Header>
              <h4 className="mb-0">Quiz Statistics</h4>
            </Card.Header>
            <Card.Body>
              <Row className="text-center">
                <Col md={4} className="mb-3">
                  <div className="border rounded p-3">
                    <h3 className="text-primary">5</h3>
                    <p className="mb-0">Quizzes Taken</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="border rounded p-3">
                    <h3 className="text-success">78%</h3>
                    <p className="mb-0">Average Score</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="border rounded p-3">
                    <h3 className="text-info">3</h3>
                    <p className="mb-0">Quizzes Created</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;