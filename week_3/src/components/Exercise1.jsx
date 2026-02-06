import React, { useEffect, useState } from 'react'
import Direction from './Direction';

function Exercise1() {
    const [users, setUsers] = useState([])
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect( () => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null)
            
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            console.log(data);
            setLoading(false);
            setUsers(data);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        }

        fetchUsers();
    }, [])

  return (
    <>
        <Direction prevPage={null} nextPage={"/ex2"} />
        <h2>User List</h2>
        {Loading && <p>
            Fetching users...
            </p>}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}

        {!Loading && (
            <ul>
              {users.map(user => (
                  <li className="user-info" key={user.id}>
                      <span>{user.name}</span> - <span>{user.email}</span>
                  </li>
              ))}
          </ul>
        )}
        
    </>
  )
}

export default Exercise1