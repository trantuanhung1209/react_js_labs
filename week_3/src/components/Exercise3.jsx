import React, { useEffect, useState } from 'react'

function Exercise3() {
    const [users, setUsers] = useState([])
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async (userId = "") => {
            setLoading(true);
            setError(null)
            
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                const data = await response.json()
                console.log(data);
                setLoading(false);
                setUsers(data);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        }

    useEffect(() => {
        const fetchInitialUsers = async () => {
          fetchUsers();
        }
        fetchInitialUsers();
    }, []);

    const handleFetch = (e) => {
        e.preventDefault();
        const userId = e.target[0].value;
        if (parseInt(userId) <= 0 && parseInt(userId) > 10) {
          setError("Invalid user ID");
          return;
        }
        console.log(userId);
        fetchUsers(userId);
    }

  return (
    <>
        <form onSubmit={handleFetch}>
            <input type="text" />
            <button type='submit'>Fetch users</button>
        </form>
        <h2>User List</h2>
        {Loading && <p>
            Fetching users...
            </p>}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}

        {!Loading && !error && (
            <ul>
              {Array.isArray(users) ? users.map(user => (
                  <li className="user-info" key={user.id}>
                      <span>{user.name}</span> - <span>{user.email}</span>
                  </li>
              )) : (
                  <li className="user-info" key={users.id}>
                      <span>{users.name}</span> - <span>{users.email}</span>
                  </li>
              )}
            </ul>
        )}
    </>
  )
}

export default Exercise3