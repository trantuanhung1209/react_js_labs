import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { authState } from '../atoms/authState'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const [auth] = useRecoilState(authState);
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    setEmail('');
    setPassword('');
    setShowForm(false);
  };

  if (auth.isLoggedIn) {
    return null; // Hide login button if already logged in
  }

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        Login
      </button>

      {showForm && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9'
        }}>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '8px',
                marginRight: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '8px',
                marginRight: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            <button type="submit" disabled={auth.loading} style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              opacity: auth.loading ? 0.6 : 1
            }}>
              {auth.loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          {auth.error && <p style={{ color: '#f00', marginTop: '10px' }}>{auth.error}</p>}
        </div>
      )}
    </div>
  )
}

export default Login
