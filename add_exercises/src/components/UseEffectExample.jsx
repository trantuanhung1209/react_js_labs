import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Direction from "./Direction";

function UseEffectExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component rendered or count changed:", count);

    return () => {
      console.log("Cleanup before next effect or unmount");
    };
  }, [count]); 

  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => setCount(count - 1);
  const handleReset = () => setCount(0);

  return (
    <div>
      <Direction prevPage="/use-state" nextPage="/use-reducer" />
      <h2>useEffect Example</h2>

      <p>Current count: {count}</p>

      <button onClick={handleDecrease}>Decrease</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleIncrease}>Increase</button>

      <hr />

      <div>
        <h3>Explanation</h3>
        <p>
          The <strong>useEffect</strong> hook lets you run side effects in a
          React component. In this example, it logs a message every time the
          <strong>count</strong> value changes.
        </p>

        <ul>
          <li>
            <strong>useEffect(() =&gt; , [count])</strong>: runs after render
            and whenever <strong>count</strong> changes.
          </li>
          <li>
            The function inside <strong>useEffect</strong> is called the
            <em>effect</em>.
          </li>
          <li>
            Returning a function creates a <strong>cleanup</strong> that runs
            before the next effect or when the component unmounts.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UseEffectExample;
