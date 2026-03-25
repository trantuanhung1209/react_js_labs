import React, { useEffect, useMemo, useState } from "react";

function UserPostsMemo() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("all");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/data.json`);
      if (!res.ok) throw new Error("Không thể tải dữ liệu");

      const data = await res.json();
      const normalizedPosts = Array.isArray(data) ? data : [data];
      setPosts(normalizedPosts);
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const userIds = useMemo(() => {
    return [...new Set(posts.map((post) => post.userId))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const isMatchingUser =
        selectedUserId === "all" || post.userId.toString() === selectedUserId;
      const isMatchingTitle = post.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return isMatchingUser && isMatchingTitle;
    });
  }, [posts, selectedUserId, search]);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilter = (e) => setSelectedUserId(e.target.value);

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
      <h3 style={{ margin: "0 0 12px", textAlign: "center" }}>
        Fetching Data Example
      </h3>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          marginBottom: "16px",
        }}
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

        <select value={selectedUserId} onChange={handleFilter}>
          <option value="all">all</option>
          {userIds.map((item, index) => (
            <option key={index} id={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={fetchData}
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

      {loading && (
        <div style={{ textAlign: "center", color: "#374151" }}>
          Đang tải dữ liệu...
        </div>
      )}

      {!loading && error && (
        <div style={{ textAlign: "center", color: "#dc2626" }}>
          Lỗi: {error}
        </div>
      )}

      {!loading && !error && filteredPosts.map((post) => (
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

export default UserPostsMemo;
