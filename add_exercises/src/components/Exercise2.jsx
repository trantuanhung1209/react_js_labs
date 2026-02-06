import React, { useState } from "react";
import Direction from "./Direction";
import axios from 'axios';

function Exercise2() {
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        const data = await response.json();
        console.log("fetch data:", data);
        setLoading(false);
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    const handleFetchWithAxios = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const data = response.data;
            console.log("axios data:", data);
            setLoading(false);
            setUsers(data);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

  return (
    <>
      <Direction prevPage={"/ex1"} nextPage={null} />
      <h2>User List</h2>
      {error?
        (<button onClick={handleFetch}>Retry</button>)
        :
        (
            <div className="">
                <button onClick={handleFetch}>Refetch Users with fetch</button>
                <button onClick={handleFetchWithAxios}>Refetch Users with axios</button>
            </div>
        )
      }
      {Loading && <p>Fetching users...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!Loading && (
        <ul>
          {users.map((user) => (
            <li className="user-info" key={user.id}>
              <span>{user.name}</span> - <span>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Exercise2;
