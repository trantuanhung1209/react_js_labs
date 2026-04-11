import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { counterState } from '../atoms/counterState';
import UserInfo from './UserInfo';
import { notificationsState } from '../atoms/notificationsState';

function ComponentB() {
  const value = useRecoilValue(counterState);
  const [count, setCount] = useRecoilState(counterState);
  const setNotes = useSetRecoilState(notificationsState);

  const handleInc = () => {
    setCount(count + 1);
  }

  const handleDec = () => {
    setCount(count - 1);
  }


  const handleNotify = () => {
    const id = Date.now()
    setNotes(prev => [...prev, { id, message: `ComponentB: count = ${count}`, type: 'info' }])
  }

  return (
    <div>
      <h2>Component B</h2>
      <div className="">
        <button onClick={handleInc}>+</button>
        <button onClick={handleDec}>-</button>
      </div>
      <button onClick={handleNotify}>Notify</button>

      <UserInfo />
    </div>
  )
}

export default ComponentB
