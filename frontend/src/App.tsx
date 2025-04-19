import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: uid,
        password,
      });
      alert('Login successful!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome back!</h1>
      <input
        className="login-input"
        type="text"
        placeholder="UID"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;


