import React from 'react'
import { useRecoilState } from 'recoil';
import { authState } from '../atoms/authState';
import { useAuth } from '../hooks/useAuth';

function Logout() {
  const [auth] = useRecoilState(authState);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  if (!auth.isLoggedIn) {
    return null; // Hide logout button if not logged in
  }

  return (
    <div>
      <button onClick={handleLogout} style={{
        padding: '8px 16px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Logout
      </button>
    </div>
  )
}

export default Logout
