import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todosState } from '../atoms/todosState';

function TodoInput() {
  const [text, setText] = useState('');
  const setTodos = useSetRecoilState(todosState);

  const handleAdd = () => {
    if (!text.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: text.trim() }]);
    setText('');
  }

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Add todo" />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default TodoInput;
