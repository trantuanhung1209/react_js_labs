import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/userState';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { useDebounce } from '../hooks/useDebounce';

function Search() {
  const [users, setUsers] = useRecoilState(userState);
  const { fetchAllUsers, searchUsers } = useFetchUsers();
  
  // Debounce keyword
  const debouncedKeyword = useDebounce(users.keyword, 500);

  // Load tất cả users khi component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Gọi API khi keyword thay đổi (sau debounce)
  useEffect(() => {
    searchUsers(debouncedKeyword);
  }, [debouncedKeyword]);

  const handleSearch = (event) => {
    setUsers(prev => ({
      ...prev,
      keyword: event.target.value
    }));
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={users.keyword}
        onChange={handleSearch}
        placeholder="Search users by name, email, or username..."
        style={{
          padding: '10px',
          fontSize: '14px',
          width: '300px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      {users.loading && <span style={{ marginLeft: '10px', color: '#666' }}>Searching...</span>}
      {users.error && <span style={{ marginLeft: '10px', color: '#f00' }}>Error: {users.error}</span>}
    </div>
  )
}

export default Search

