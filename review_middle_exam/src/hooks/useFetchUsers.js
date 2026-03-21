import { useEffect, useState } from "react";

function useFetchUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });

  const fetchUsers = async (userId = "") => {
    setLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/userId`);
      if (!res.ok) throw new Error("Khong the tai du lieu");

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : [data]);
      setError({ error: false, message: "" });
    } catch (err) {
      setError({ error: true, message: err.message });
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, fetchUsers };
}

export default useFetchUsers;