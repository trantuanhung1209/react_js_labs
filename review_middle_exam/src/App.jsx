
import React, { use, useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });
  const fetchData = async (userId = "") => {
    setLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      if (!res.ok) throw new Error("Không thể tải dữ liệu");

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : [data]); 
      setError({ error: false, message: "" });
    } catch (err) {
      setError({ error: true, message: err.message });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [])

  const handleFetch = (e) => {
    e.preventDefault();
    const userId = e.target[0].value;
    if (parseInt(userId) <= 0 || parseInt(userId) > 10) {
      setError({ error: true, message: "user not found" });
      return;
    }
    console.log(userId);
    fetchData(userId);
  }

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error.error) return <div>Lỗi: {error.message}</div>;

  return (
    <>
      <form onSubmit={handleFetch}>
        <input type="text" />
        <button type='submit'>Fetch users</button>
      </form>
      <h2>User List</h2>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            style={{
              display: "flex"
            }}
          >
            <div>
              {user.name}
            </div>
            -
            <div>
              {user.email}
            </div>
          </div>
        )
      })}
    </>
  );
}

export default App;