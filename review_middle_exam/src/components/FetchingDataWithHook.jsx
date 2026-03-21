import React, { useState } from "react";
import useFetchUsers from "../hooks/useFetchUsers";

function FetchingDataWithHook() {
  const [userId, setUserId] = useState("");
  const { users, loading, error, fetchUsers } = useFetchUsers();

  const handleFetch = (e) => {
    e.preventDefault();
    const id = parseInt(userId, 10);

    if (userId !== "" && (Number.isNaN(id) || id <= 0 || id > 10)) {
      return;
    }

    fetchUsers(userId);
  };

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
      <h3 style={{ margin: "0 0 12px", textAlign: "center" }}>Fetching Data With Custom Hook</h3>

      <form
        onSubmit={handleFetch}
        style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "16px" }}
      >
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Nhap id user (1-10)"
          style={{
            width: "200px",
            padding: "8px 10px",
            border: "1px solid #9ca3af",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        />
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

      {loading && <div style={{ textAlign: "center", color: "#374151" }}>Dang tai du lieu...</div>}

      {!loading && error.error && (
        <div style={{ textAlign: "center", color: "#dc2626" }}>Loi: {error.message}</div>
      )}
 
      {!loading && !error.error && (
        <>
          <h2 style={{ margin: "0 0 12px", color: "#1f2937" }}>User List</h2>
          {users.map((user) => (
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
        </>
      )}
    </div>
  );
}

export default FetchingDataWithHook;