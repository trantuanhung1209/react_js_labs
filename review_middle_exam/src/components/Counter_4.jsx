import React from 'react'
import useCounter from '../hooks/useCounter';

function Counter_4() {
    const { count, inc, dec, reset } = useCounter(0);

  return (
    <div>
      <h3>Counter 4 - Custom Hook</h3>
      <h2>{count}</h2>
      <button onClick={dec}>-</button>
      <button onClick={inc}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Counter_4