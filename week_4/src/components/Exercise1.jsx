import React, { useEffect, useReducer, useState } from "react";
import Direction from "./Direction";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}

const initialState = {
  todos: [],
};

function Exercise1() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.elements[0].value.trim();
    if (!title) return;

    // Thêm todo mới vào state
    const newTodo = { id: Date.now(), title, completed: false };
    dispatch({ type: "ADD_TODO", payload: newTodo });
    console.log("Added todo:", newTodo);
    console.log("Current todos state:", state.todos);
  };

  return (
    <>
      <form
        style={{
            marginTop: "20px"
        }}
      onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a new todo..." />
        <button type="submit">Add</button>
      </form>
      <h2>Todos List</h2>
      <ul>
        {state.todos.map((todo) => (
          <li className="todo-item" key={todo.id}
            style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent:"space-between"
            }}
          >
            <span 
                style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    flex: 1
                }}
            >{todo.title}</span>
            <input 
                type="checkbox" 
                name="" 
                id="" 
                checked={todo.completed}
                onChange={() =>
                    dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                }
            />
            <button
              onClick={() =>{
                const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
                if (confirmDelete) {
                  dispatch({ type: "DELETE_TODO", payload: todo.id });
                }
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Exercise1;
