import React, { useState, useCallback } from "react";
import Direction from "./Direction";

function Child({ onClick }) {
  console.log("Child rendered");

  return (
    <div>
      <button onClick={onClick}>Click from Child</button>
    </div>
  );
}

export default function UseCallbackExample() {
  const [count, setCount] = useState(0);

  const handleChildClick = useCallback(() => {
    console.log("Child button clicked");
  }, []); 

  return (
    <div>
        <Direction prevPage="/use-memo" nextPage="/memo" />
      <h2>useCallback Example</h2>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>Increase Count</button>

      <Child onClick={handleChildClick} />

      <hr />

      <div>
        <h3>Explanation</h3>
        <p>
          The <strong>useCallback</strong> hook memoizes a function so that its
          reference does not change between renders. This helps prevent
          unnecessary re-renders of child components that depend on the
          function prop.
        </p>

        <ul>
          <li>
            <strong>useCallback(() =&gt; (...), [])</strong> keeps the same
            function reference across renders.
          </li>
          <li>
            Without <strong>useCallback</strong>, a new function is created on
            every render, which may cause child components to re-render.
          </li>
          <li>
            Commonly used together with <strong>React.memo</strong> for
            performance optimization.
          </li>
        </ul>
      </div>
    </div>
  );
}
