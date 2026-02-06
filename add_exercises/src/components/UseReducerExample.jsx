import React, { useReducer } from "react";
import Direction from "./Direction";

function reducer(state, action) {
  switch (action.type) {
    case "INCREASE":
      return { count: state.count + 1 };
    case "DECREASE":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

const initialState = { count: 0 };

export default function UseReducerExample() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
        <Direction prevPage="/use-effect" nextPage="/use-ref" />
      <h2>useReducer Example</h2>

      <p>Current count: {state.count}</p>

      <button onClick={() => dispatch({ type: "DECREASE" })}>Decrease</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "INCREASE" })}>Increase</button>

      <hr />

      <div>
        <h3>Explanation</h3>
        <p>
          The <strong>useReducer</strong> hook is an alternative to
          <strong>useState</strong> for managing more complex state logic. It
          uses a <strong>reducer function</strong> to decide how the state
          changes based on an <strong>action</strong>.
        </p>

        <ul>
          <li>
            <strong>reducer(state, action)</strong>: returns the new state.
          </li>
          <li>
            <strong>dispatch( action )</strong>: sends an action to the reducer.
          </li>
          <li>
            Useful when state logic is complex or has many related updates.
          </li>
        </ul>
      </div>
    </div>
  );
}
