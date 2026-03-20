import React, { useRef, useState } from "react";

function Counter_3() {
  const countRef = useRef(0);
  const [, forceRender] = useState(0);
  return (
    <div>
      <h3>Counter 3 - useRef + useState</h3>
      <h2>{countRef.current}</h2>
      <button
        onClick={() => {
          countRef.current++;
          forceRender((prev) => prev + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          countRef.current--;
          forceRender((prev) => prev + 1);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          countRef.current = 0;
          forceRender((prev) => prev + 1);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Counter_3;
