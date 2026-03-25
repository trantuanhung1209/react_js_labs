import React, { useEffect, useState } from "react";

function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [postsHandle, setPostsHandle] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ error: false, message: "" });

    const [userIds, setUserIds] = useState([]);
    const [option, setOption] = useState('all');
    const [search, setSearch] = useState('');


    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/data.json`);
            if (!res.ok) throw new Error("Không thể tải dữ liệu");

            const data = await res.json();
            setPosts(Array.isArray(data) ? data : [data]);
            const filter = [...new Set(data.map((user) => {
                return user.userId;
            }))];
            setUserIds(filter);
            setPostsHandle(Array.isArray(data) ? data : [data])

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

    useEffect(() => {
        let result = [...posts];

        // 1. Lọc theo UserId (Option)
        if (option !== "all" && option !== "") {
            result = result.filter(post => post.userId.toString() === option.toString());
        }

        // 2. Lọc theo Search Title
        if (search.trim() !== "") {
            result = result.filter(post => 
                post.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        setPostsHandle(result);
    }, [search, option, posts]);

    const handleFetch = (e) => {
        e.preventDefault();
        const userId = e.target[0].value;

        if (parseInt(userId) <= 0 || parseInt(userId) > 10) {
            setError({ error: true, message: "user not found" });
            return;
        }

        fetchData(userId);
    };

    const handleSearch = (e) => setSearch(e.target.value);
    const handleFilter = (e) => setOption(e.target.value);

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
                    placeholder="search title..."
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
                    {userIds.map((item, index) => (
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
                    Fetch posts
                </button>
            </form>

            <h2 style={{ margin: "0 0 12px", color: "#1f2937" }}>User List</h2>

            {postsHandle.map((post) => (
                <div
                    key={post.id}
                    style={{
                        display: "flex",
                        gap: "6px",
                        padding: "8px 10px",
                        borderBottom: "1px solid #e5e7eb",
                        color: "#374151",
                    }}
                >
                    <div style={{ fontWeight: "600" }}>{post.title}</div>
                    <div>-</div>
                    <div>{post.body}</div>
                </div>
            ))}
        </div>
    );
}

export default UserPosts;
