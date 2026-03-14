import React, { useEffect, useState } from 'react'
import Direction from './Direction';

function Exercise2() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ error: false, message: "" });
    const url = 'https://jsonplaceholder.typicode.com/users'
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error("Không thể tải dữ liệu");

                const data = await res.json();
                setUsers(data);
                setError({ error: false, message: "" });
            } catch (err) {
                setError({ error: true, message: err.message });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    if (loading) return <div>Đang tải dữ liệu...</div>;
    if (error.error) return <div>Lỗi: {error.message}</div>;

    return (
        <>
            <Direction prevPage={"/ex1"} nextPage={"/ex3"} />
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
    )
}

export default Exercise2