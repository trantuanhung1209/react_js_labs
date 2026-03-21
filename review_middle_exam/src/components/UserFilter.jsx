import React, { useEffect, useState } from "react";

function UserFilter() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ error: false, message: "" });

    const [search, setSearch] = useState('');
    const [userSearchs, setUserSearchs] = useState([]);
    const [category, setCategory] = useState([]);
    const [option, setOption] = useState('');


    const fetchData = async (userId = "") => {
        setLoading(true);
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            if (!res.ok) throw new Error("Không thể tải dữ liệu");

            const data = await res.json();
            setUsers(Array.isArray(data) ? data : [data]);
            setUserSearchs(Array.isArray(data) ? data : [data]);

            const filterCatagory = [...new Set(data.map((user) => {
                return user.address.city;
            }))];
            setCategory(filterCatagory);

            setError({ error: false, message: "" });
        } catch (err) {
            setError({ error: true, message: err.message });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFetch = (e) => {
        e.preventDefault();
        const userId = e.target[0].value;

        if (parseInt(userId) <= 0 || parseInt(userId) > 10) {
            setError({ error: true, message: "user not found" });
            return;
        }

        fetchData(userId);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        console.log(value);
        setSearch(value);
        const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
        setUserSearchs(filteredUsers);
        console.log(userSearchs);
    };

    const handleFilter = (e) => {

        const value = e.target.value;
        console.log(value);
        setOption(value);

        if (value === "" || value === "all") {
            setUserSearchs(users);
            return;
        }
        const filteredUsers = users.filter((user) => {
            return user.address?.city === value;
        });
    
        setUserSearchs(filteredUsers);
    }

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "24px", color: "#374151" }}>
                Đang tải dữ liệu...
            </div>
        );
    }

    if (error.error) {
        return (
            <div style={{ textAlign: "center", marginTop: "24px", color: "#dc2626" }}>
                Lỗi: {error.message}
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: "560px",
                margin: "24px auto",
                padding: "16px",
                border: "1px solid #d1d5db",
                borderRadius: "12px",
                backgroundColor: "#f9fafb",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
            }}
        >
            <h3 style={{ margin: "0 0 12px", textAlign: "center" }}>Fetching Data Example</h3>

            <form
                onSubmit={handleFetch}
                style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "16px" }}
            >
                <input
                    type="text"
                    placeholder="Nhập id user (1-10)"
                    style={{
                        width: "200px",
                        padding: "8px 10px",
                        border: "1px solid #9ca3af",
                        borderRadius: "8px",
                        fontSize: "14px",
                    }}
                />

                <input
                    type="text"
                    placeholder="Search name..."
                    style={{
                        width: "200px",
                        padding: "8px 10px",
                        border: "1px solid #9ca3af",
                        borderRadius: "8px",
                        fontSize: "14px",
                    }}
                    value={search}
                    onChange={handleSearch}
                />

                <select onChange={handleFilter}>
                    <option value="all">all</option>
                    {category.map((item, index) => (
                        <option key={index} id={index} value={item}>{item}</option>
                    ))}
                </select>

                <button
                    type="submit"
                    style={{
                        padding: "8px 12px",
                        border: "none",
                        borderRadius: "8px",
                        backgroundColor: "#2563eb",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    Fetch users
                </button>
            </form>

            <h2 style={{ margin: "0 0 12px", color: "#1f2937" }}>User List</h2>

            {userSearchs.map((user) => (
                <div
                    key={user.id}
                    style={{
                        display: "flex",
                        gap: "6px",
                        padding: "8px 10px",
                        borderBottom: "1px solid #e5e7eb",
                        color: "#374151",
                    }}
                >
                    <div style={{ fontWeight: "600" }}>{user.name}</div>
                    <div>-</div>
                    <div>{user.email}</div>
                </div>
            ))}
        </div>
    );
}

export default UserFilter;
