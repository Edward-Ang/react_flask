import React, { useState } from 'react';
import "./App.css"
import Toast from 'react-bootstrap/Toast';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from "./pages/home"

const Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      setMessage(data.message);
      setShowA(!showA);

      console.log(data.message);
      // If login is successful, navigate to the home page
      if (data.message === 'Login successful') {
        // Redirect to the home page
        navigate('/home');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = async () => {
    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    setMessage(data.message);

    console.log(data.message);
  };

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-header">
          <div>
            Login
          </div>
        </div>
        <input type="text" className="login-input" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" className="login-input" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="login-button" id="login-button" onClick={handleLogin}>Login</button>
      </div>
      <Toast id='toast' show={showA} onClose={toggleShowA} delay={3000} autohide>
        <Toast.Body id='toastBody'><i className="bi bi-info-circle"></i>{message && <div>{message}</div>}</Toast.Body>
      </Toast>
    </div>
  );
}

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
);
export default App;
