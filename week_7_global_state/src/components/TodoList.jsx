import React from 'react';
import { useRecoilValue } from 'recoil';
import { todosState } from '../atoms/todosState';
import TodoItem from './TodoItem';

function TodoList() {
  const todos = useRecoilValue(todosState);

  if (todos.length === 0) return <p>No todos yet.</p>

  return (
    <ul>
      {todos.map(t => <TodoItem key={t.id} todo={t} />)}
    </ul>
  )
}

export default TodoList;
