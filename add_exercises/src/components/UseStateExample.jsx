import React from "react";
import { useState } from "react";
import Direction from "./Direction";

function UseStateExample() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div>
      <Direction prevPage="/ex1" nextPage="/use-effect" />
      <h2>useState Counter Example</h2>

      <p>Current count: {count}</p>

      <button onClick={handleDecrease}>Decrease</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleIncrease}>Increase</button>

      <hr />
      <div>
        <h3>Explanation</h3>
        <p>
          This component uses the <strong>useState</strong> hook to store a
          number called <strong>count</strong>. When you click the buttons, the
          <strong>setCount</strong> function updates the value, and React
          automatically re-renders the component to show the new number.
        </p>
        <ul>
          <li>
            <strong>useState(0)</strong>: sets the initial value to 0.
          </li>
          <li>
            <strong>setCount(count + 1)</strong>: increases the number.
          </li>
          <li>
            <strong>setCount(count - 1)</strong>: decreases the number.
          </li>
          <li>
            <strong>setCount(0)</strong>: resets the number to 0.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UseStateExample;
