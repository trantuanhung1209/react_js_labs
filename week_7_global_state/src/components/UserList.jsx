import React from 'react'
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/userState';

function UserList() {
  const { keyword, searchResults, loading, error } = useRecoilValue(userState);

  return (
    <div>
      <h2>User List {keyword && `(Search: "${keyword}")`}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <p>Found: {searchResults.length} users</p>
      
      {searchResults.length === 0 && !loading ? (
        <p>No users found</p>
      ) : (
        <ul>
          {searchResults.map(user => (
            <li key={user.id}>
              <strong>{user.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserList

