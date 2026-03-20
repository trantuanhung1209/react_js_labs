import React, { memo, useCallback, useState } from "react";

const ActionPanel = memo(function ActionPanel({ onIncrease }) {
  console.log("ActionPanel re-render");

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #c7d2fe",
        backgroundColor: "#eef2ff",
      }}
    >
      <button
        onClick={onIncrease}
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
        Increase count
      </button>
    </div>
  );
});

function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleIncrease = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

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
      <h3 style={{ margin: "0 0 12px", textAlign: "center" }}>useCallback Example</h3>

      <p style={{ margin: "0 0 12px", color: "#374151" }}>
        Nhap text de parent re-render. Child memoized se khong re-render neu callback khong doi reference.
      </p>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhap bat ky de test parent render"
        style={{
          width: "100%",
          boxSizing: "border-box",
          marginBottom: "12px",
          padding: "8px 10px",
          border: "1px solid #9ca3af",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      />

      <div style={{ marginBottom: "12px", color: "#4b5563" }}>Count: {count}</div>

      <ActionPanel onIncrease={handleIncrease} />
    </div>
  );
}

export default UseCallbackDemo;