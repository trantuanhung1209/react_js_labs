import React, { useMemo, useState } from "react";
import useFetchUsers from "../hooks/useFetchUsers";

function Test() {
  const [keyword, setKeyword] = useState("");
  const { users, loading, error } = useFetchUsers();

  const filteredUsers = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    if (!normalizedKeyword) return users;

    return users.filter((user) => {
      const name = user.name?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      const username = user.username?.toLowerCase() || "";
      return (
        name.includes(normalizedKeyword) ||
        email.includes(normalizedKeyword) ||
        username.includes(normalizedKeyword)
      );
    });
  }, [users, keyword]);

  return (
    <div
      style={{
        maxWidth: "620px",
        margin: "24px auto",
        padding: "16px",
        border: "1px solid #d1d5db",
        borderRadius: "12px",
        backgroundColor: "#f9fafb",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
      }}
    >
      <h3 style={{ margin: "0 0 12px", textAlign: "center" }}>
        useMemo + Custom Hook Search Users
      </h3>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search by name, username, email"
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #9ca3af",
          borderRadius: "8px",
          fontSize: "14px",
          marginBottom: "12px",
          boxSizing: "border-box",
        }}
      />

      {loading && <div style={{ color: "#4b5563" }}>Dang tai users...</div>}
      {!loading && error.error && (
        <div style={{ color: "#dc2626" }}>Loi: {error.message}</div>
      )}

      {!loading && !error.error && (
        <>
          <div style={{ marginBottom: "10px", color: "#374151" }}>
            Ket qua: {filteredUsers.length} / {users.length} users
          </div>

          {filteredUsers.map((user) => (
            <div
              key={user.id}
              style={{
                padding: "10px 12px",
                borderBottom: "1px solid #e5e7eb",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "8px",
              }}
            >
              <div>
                <div style={{ fontWeight: "600", color: "#111827" }}>
                  {user.name}
                </div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  @{user.username}
                </div>
              </div>

              <div style={{ fontSize: "14px", color: "#374151" }}>
                {user.email}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Test;