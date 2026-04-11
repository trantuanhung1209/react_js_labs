import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todosState } from '../atoms/todosState';

function TodoItem({ todo }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const setTodos = useSetRecoilState(todosState);

  const handleDelete = () => {
    setTodos(prev => prev.filter(t => t.id !== todo.id));
  }

  const handleSave = () => {
    setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, text: text } : t));
    setEditing(false);
  }

  return (
    <li>
      {editing ? (
        <>
          <input value={text} onChange={e => setText(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  )
}

export default TodoItem;
