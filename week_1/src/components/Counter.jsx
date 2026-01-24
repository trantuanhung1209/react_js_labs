import React, { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count+1);
    }

    const decrease = () => {
        if (count <= 0) {
            alert("Count cannot be less than 0");
            setCount(0);
        } else {
            setCount(count-1);
        }
    }

    const reset = () => {
        setCount(0);
    }
  return (
    <div>
      value: {count > 10 ? 
      <span style={{
        color: "red"
      }}>{count}</span> : <span>{count}</span>}
      <div className="">
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  )
}

export default Counter
