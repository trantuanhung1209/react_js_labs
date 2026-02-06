import React, { useState, useMemo } from "react";
import Direction from "./Direction";

export default function UseMemoExample() {
  const [count, setCount] = useState(0);

  const expensiveValue = useMemo(() => {
    console.log("Calculating expensive value...");

    let total = 0;
    for (let i = 0; i < 100000000; i++) {
      total += i;
    }

    return total + count;
  }, [count]); 

  return (
    <div>
      <Direction prevPage="/use-ref" nextPage="/use-callback" />
        <h2>useMemo Example</h2>
      <p>Count: {count}</p>
      <p>Expensive value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>

      <hr />

      <div>
        <h3>Explanation</h3>
        <p>
          The <strong>useMemo</strong> hook is used to <strong>memoize</strong>
          (remember) the result of an expensive calculation so React does not
          recompute it on every render.
        </p>

        <ul>
          <li>
            <strong>useMemo(() =&gt; (...), [count])</strong> only recalculates
            when <strong>count</strong> changes.
          </li>
          <li>
            Without <strong>useMemo</strong>, the heavy loop would run on every
            render and slow down the UI.
          </li>
          <li>
            Use it only for <strong>expensive computations</strong>, not for
            simple values.
          </li>
        </ul>
      </div>
    </div>
  );
}
