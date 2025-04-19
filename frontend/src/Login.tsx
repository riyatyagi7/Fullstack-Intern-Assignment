import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email: uid,
        password,
      });
      setMessage("Login successful");
    } catch (error) {
      setMessage("Login failed"); 
    }
  };

  return (
    <div className="body">
      <div className="login-container">
        <h2 className="login-title">Welcome back!</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="UID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {message && <p style={{ textAlign: "center" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;


