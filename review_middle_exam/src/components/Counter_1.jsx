import React, { useState } from "react";

function CounterState() {
  const [count, setCount] = useState({ count: 0, step: 1 });

  // functions
  const handleIncrease = () => setCount((prev) => ({ ...prev, count: prev.count + prev.step }));
  const handleDecrease = () => setCount((prev) => ({ ...prev, count: prev.count - prev.step }));
  const handleReset = () => setCount({ count: 0, step: 1 });

  return (
    <div
      style={{
        maxWidth: "320px",
        margin: "24px auto",
        padding: "16px",
        border: "1px solid #d1d5db",
        borderRadius: "12px",
        backgroundColor: "#f9fafb",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
      }}
    >
      <h3 style={{ margin: "0 0 12px" }}>Counter 1 - useState</h3>
      <p style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: "600" }}>You clicked {count.count} times</p>
      <p style={{ margin: "0 0 16px", color: "#4b5563" }}>Step: {count.step}</p>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "12px" }}>
        <button
          style={{
            padding: "8px 12px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={handleIncrease}
        >
          +
        </button>
        <button
          style={{
            padding: "8px 12px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#f59e0b",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={handleDecrease}
        >
          -
        </button>
        <button
          style={{
            padding: "8px 12px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#ef4444",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <input
        type="number"
        value={count.step}
        style={{
          width: "80px",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #9ca3af",
          textAlign: "center",
          fontSize: "14px",
        }}
        onChange={(e) => setCount((prev) => ({ ...prev, step: parseInt(e.target.value) || 1 }))}
      />
    </div>
  );
}

export default CounterState;
