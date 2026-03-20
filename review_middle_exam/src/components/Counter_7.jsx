import React, { createContext, useContext, useReducer } from "react";

const CounterContext = createContext(null);

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "reset":
      return { count: 0, step: 1 };
    case "setStep":
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used inside CounterProvider");
  }
  return context;
}

function CounterDisplay() {
  const { state } = useCounter();
  return (
    <>
      <p style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: "600" }}>
        You clicked {state.count} times
      </p>
      <p style={{ margin: "0 0 16px", color: "#4b5563" }}>Step: {state.step}</p>
    </>
  );
}

function CounterActions() {
  const { dispatch } = useCounter();

  return (
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
        onClick={() => dispatch({ type: "increment" })}
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
        onClick={() => dispatch({ type: "decrement" })}
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
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </div>
  );
}

function CounterStepInput() {
  const { state, dispatch } = useCounter();

  return (
    <input
      type="number"
      value={state.step}
      style={{
        width: "80px",
        padding: "8px",
        borderRadius: "8px",
        border: "1px solid #9ca3af",
        textAlign: "center",
        fontSize: "14px",
      }}
      onChange={(e) =>
        dispatch({ type: "setStep", payload: parseInt(e.target.value, 10) || 1 })
      }
    />
  );
}

function Counter_7() {
  return (
    <CounterProvider>
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
        <h3 style={{ margin: "0 0 12px" }}>Counter 7 - useContext + useReducer</h3>
        <CounterDisplay />
        <CounterActions />
        <CounterStepInput />
      </div>
    </CounterProvider>
  );
}

export default Counter_7;