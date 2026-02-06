import React, { useState, memo } from "react";
import Direction from "./Direction";

const Child = memo(function Child({ value }) {
  console.log("Child rendered");

  return (
    <div>
      <p>Child value: {value}</p>
    </div>
  );
});

export default function ReactMemoExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div>
        <Direction prevPage="/use-callback" nextPage="/ex2" />
      <h2>React.memo Example</h2>

      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>

      <div>
        <input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <Child value={count} />

      <hr />

      <div>
        <h3>Explanation</h3>
        <p>
          <strong>React.memo</strong> is a higher-order component that prevents
          unnecessary re-renders of a child component when its
          <strong> props do not change</strong>.
        </p> 

        <ul>
          <li>
            When the parent re-renders because of <strong> text</strong> change,
            the child does <strong> not</strong> re-render since
            <strong> count</strong> is unchanged.
          </li>
          <li>
            Without <strong>React.memo</strong>, the child would re-render on
            every parent render.
          </li>
          <li>
            Commonly used with <strong>useCallback</strong> and
            <strong>useMemo</strong> for performance optimization.
          </li>
        </ul>
      </div>
    </div>
  );
}
