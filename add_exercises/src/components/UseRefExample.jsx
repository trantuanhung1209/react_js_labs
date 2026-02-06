import React, { useRef } from "react";
import Direction from "./Direction";

export default function UseRefExample() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
        <Direction prevPage="/use-callback" nextPage="/use-memo" />
      <h2>useRef Example</h2>

      <input ref={inputRef} type="text" placeholder="Type something here..." />
      <button onClick={handleFocus}>Focus Input</button>

      <hr />
      <div>
        <h3>Explanation</h3>
        <p>
          The <strong>useRef</strong> hook lets you keep a value that does not
          cause the component to re-render. It is commonly used to access
          <strong>DOM elements</strong> directly.
        </p>

        <ul>
          <li>
            <strong>useRef(null)</strong>: creates a reference object with an
            initial value of <em>null</em>.
          </li>
          <li>
            The real DOM element is stored inside
            <strong>inputRef.current</strong> after render.
          </li>
          <li>
            Calling <strong>inputRef.current.focus()</strong> focuses the input
            without re-rendering the component.
          </li>
          <li>
            Unlike <strong>useState</strong>, changing a ref value does
            <strong>not</strong> trigger a re-render.
          </li>
        </ul>
      </div>
    </div>
  );
}
