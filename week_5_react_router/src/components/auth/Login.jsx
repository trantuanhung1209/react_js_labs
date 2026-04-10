import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  function handleLogin() {
    setUser({ name: 'User' });
    navigate('/dashboard/profile');
  }
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}