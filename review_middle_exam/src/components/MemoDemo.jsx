import React, { memo, useState } from "react";

const ExpensiveChild = memo(function ExpensiveChild({ count }) {
  console.log("ExpensiveChild re-render");

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "10px",
        backgroundColor: "#eef2ff",
        border: "1px solid #c7d2fe",
      }}
    >
      <strong>Child memoized:</strong> Count = {count}
    </div>
  );
});

function MemoDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

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
      <h3 style={{ margin: "0 0 12px", textAlign: "center" }}>React.memo Example</h3>

      <p style={{ margin: "0 0 12px", color: "#374151" }}>
        Nhap input de parent re-render. Child chi render lai khi prop <code>count</code> thay doi.
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <button
          style={{
            padding: "8px 12px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => setCount((prev) => prev + 1)}
        >
          Tang count
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhap text de thu parent render"
          style={{
            flex: 1,
            padding: "8px 10px",
            border: "1px solid #9ca3af",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        />
      </div>

      <div style={{ marginBottom: "12px", color: "#4b5563" }}>Parent text: {text || "(rong)"}</div>

      <ExpensiveChild count={count} />
    </div>
  );
}

export default MemoDemo;