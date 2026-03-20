import React from "react";
import { createStore } from "redux";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";
const SET_STEP = "SET_STEP";

const initialState = { count: 0, step: 1 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + state.step };
    case DECREMENT:
      return { ...state, count: state.count - state.step };
    case RESET:
      return initialState;
    case SET_STEP:
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

const store = createStore(counterReducer);

function useReduxState(reduxStore) {
  return React.useSyncExternalStore(reduxStore.subscribe, reduxStore.getState);
}

function CounterReduxView() {
  const { count, step } = useReduxState(store);

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
      <h3 style={{ margin: "0 0 12px" }}>Counter 8 - Redux (Plain)</h3>
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
          onClick={() => store.dispatch({ type: INCREMENT })}
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
          onClick={() => store.dispatch({ type: DECREMENT })}
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
          onClick={() => store.dispatch({ type: RESET })}
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
        onChange={(e) =>
          store.dispatch({ type: SET_STEP, payload: parseInt(e.target.value, 10) || 1 })
        }
      />
    </div>
  );
}

function Counter_8() {
  return <CounterReduxView />;
}

export default Counter_8;