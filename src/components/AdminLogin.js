import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // ✅ Use relative path so proxy forwards to backend
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/admin/dashboard');
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Cannot connect to server. Make sure backend is running.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login as Admin</button>
      </form>
      <p>Default: admin@ebook.com / admin123</p>
    </div>
  );
}

export default AdminLogin;