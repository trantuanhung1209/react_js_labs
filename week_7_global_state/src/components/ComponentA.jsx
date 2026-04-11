import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { counterState } from '../atoms/counterState';
import UserInfo from './UserInfo';
import { notificationsState } from '../atoms/notificationsState';

function ComponentA() {
  const value = useRecoilValue(counterState);
  const setNotes = useSetRecoilState(notificationsState);

  const handleNotify = () => {
    const id = Date.now()
    setNotes(prev => [...prev, { id, message: `ComponentA: value = ${value}`, type: 'info' }])
  }

  return (
    <div>
      <h2>Component A</h2>
      <p>Counter Value: {value}</p>
      <UserInfo />

      <button onClick={handleNotify}>Notify</button>
    </div>
  )
}

export default ComponentA
