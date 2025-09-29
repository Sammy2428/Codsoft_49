import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import QuizCreator from './components/quiz/QuizCreator';
import QuizList from './components/quiz/QuizList';
import QuizTaker from './components/quiz/QuizTaker';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

const Home: React.FC = () => {
  const [apiMessage, setApiMessage] = useState<string>('Testing connection...');
  const { user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setApiMessage(data.message))
      .catch(err => {
        console.error('Fetch error:', err);
        setApiMessage('Backend connection failed: ' + err.message);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 mb-4">Welcome to QuizMaker! 🎯</h1>
        <p className="lead mb-4">
          {user 
            ? `Hello ${user.username}! Ready to test your knowledge?`
            : 'Create, share, and take amazing quizzes with our platform.'
          }
        </p>
        
        <div className={`alert ${apiMessage.includes('failed') ? 'alert-warning' : 'alert-success'} mb-4`}>
          <strong>System Status:</strong> {apiMessage}
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="card text-center h-100">
                  <div className="card-body">
                    <h5>🎨 Create</h5>
                    <p>Design custom quizzes with multiple question types</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card text-center h-100">
                  <div className="card-body">
                    <h5>📊 Share</h5>
                    <p>Share your quizzes with the community</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card text-center h-100">
                  <div className="card-body">
                    <h5>🏆 Compete</h5>
                    <p>Track scores and improve your knowledge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button href="/quizzes" variant="primary" size="lg" className="me-3">
            Browse Quizzes
          </Button>
          <Button href="/create-quiz" variant="outline-primary" size="lg" className="me-3">
            Create Quiz
          </Button>
          {!user && (
            <Button href="/register" variant="success" size="lg">
              Get Started
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <a className="navbar-brand" href="/">QuizMaker</a>
            <div className="navbar-nav">
              <a className="nav-link" href="/">Home</a>
              <a className="nav-link" href="/dashboard">Dashboard</a>
              <a className="nav-link" href="/quizzes">Quizzes</a>
              <a className="nav-link" href="/create-quiz">Create Quiz</a>
              {user ? (
                <>
                  <a className="nav-link" href="/profile">Profile</a>
                  <span className="nav-link">Welcome, {user.username}</span>
                  <button className="nav-link btn btn-link" onClick={logout} style={{color: 'white', border: 'none', background: 'none'}}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a className="nav-link" href="/login">Login</a>
                  <a className="nav-link" href="/register">Register</a>
                </>
              )}
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/create-quiz" element={<QuizCreator />} />
          <Route path="/quiz/:id" element={<QuizTaker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;