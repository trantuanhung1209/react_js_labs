import React from 'react'
import { useRecoilValue } from 'recoil';
import { authState } from '../atoms/authState';

function UserInfo() {
  const { isLoggedIn, user, token } = useRecoilValue(authState);

  return (
    <div>
      {isLoggedIn && user ? (
        <div style={{
          padding: '10px',
          backgroundColor: '#e8f5e9',
          borderRadius: '4px',
          marginTop: '10px',
          color: '#2e7d32',
        }}>
          <p><strong>User:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Token:</strong> {token ? token.substring(0, 20) + '...' : 'No token'}</p>
        </div>
      ) : null}
    </div>
  )
}

export default UserInfo
