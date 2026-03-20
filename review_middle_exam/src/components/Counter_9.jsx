import React from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0, step: 1 },
  reducers: {
    increment: (state) => {
      state.count += state.step;
    },
    decrement: (state) => {
      state.count -= state.step;
    },
    reset: (state) => {
      state.count = 0;
      state.step = 1;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

const { increment, decrement, reset, setStep } = counterSlice.actions;

function useReduxToolkitState(reduxStore) {
  return React.useSyncExternalStore(reduxStore.subscribe, reduxStore.getState);
}

function CounterToolkitView() {
  const { count, step } = useReduxToolkitState(store).counter;

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
      <h3 style={{ margin: "0 0 12px" }}>Counter 9 - Redux Toolkit</h3>
      <p style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: "600" }}>
        You clicked {count} times
      </p>
      <p style={{ margin: "0 0 16px", color: "#4b5563" }}>Step: {step}</p>

      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        <button
          style={{
            padding: "8px 12px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => store.dispatch(increment())}
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
          onClick={() => store.dispatch(decrement())}
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
          onClick={() => store.dispatch(reset())}
        >
          Reset
        </button>
      </div>

      <input
        type="number"
        value={step}
        style={{
          width: "80px",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #9ca3af",
          textAlign: "center",
          fontSize: "14px",
        }}
        onChange={(e) => store.dispatch(setStep(parseInt(e.target.value, 10) || 1))}
      />
    </div>
  );
}

function Counter_9() {
  return <CounterToolkitView />;
}

export default Counter_9;