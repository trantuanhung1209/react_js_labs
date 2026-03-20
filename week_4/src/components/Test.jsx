import React, { useState, useCallback, memo, useEffect } from "react";
import Direction from "./Direction";

// TodoItem: chỉ re-render khi props thay đổi
const TodoItem = memo(function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li style={{ display: "flex", alignItems: "center", padding: 4 }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: 8 }}
      />

      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none"
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => onDelete(todo.id)}>Xóa</button>
    </li>
  );
});

function TodoInput({ onAdd, loading }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue("");
    }
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="Thêm todo..."
        style={{ padding: 6, width: 220, marginRight: 8 }}
      />

      <button onClick={handleAdd} disabled={loading}>
        Thêm
      </button>
    </div>
  );
}

function TodoList({ todos, onDelete, onToggle }) {
  return (
    <ul
      style={{
        padding: 0,
        listStyle: "none",
        maxHeight: 400,
        overflow: "auto",
        border: "1px solid #eee",
        borderRadius: 8
      }}
    >
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

function Exercise5() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchTodos = async () => {
      try {
        const res = await fetch(
          "https://6774077677a26d4701c708da.mockapi.io/api/todos"
        );

        if (!res.ok) {
          setError("Error fetching todos");
          return;
        }

        const data = await res.json();
        setTodos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = useCallback(async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa không?");
    if (!confirmDelete) return;

    try {
      await fetch(
        `https://6774077677a26d4701c708da.mockapi.io/api/todos/id`,
        { method: "DELETE" }
      );

      setTodos((todos) =>
        todos.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleToggle = useCallback(async (id) => {
    try {
      const res = await fetch(
        `https://6774077677a26d4701c708da.mockapi.io/api/todos/id`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: true })
        }
      );

      const newTodo = await res.json();

      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? newTodo : todo
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleAdd = useCallback(async (text) => {
    try {
      const res = await fetch(
        "https://6774077677a26d4701c708da.mockapi.io/api/todos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, completed: false })
        }
      );

      const newTodo = await res.json();

      setTodos((todos) => [newTodo, ...todos]);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return (
    <>
      <Direction prevPage={'/ex4'} nextPage={''} />

      <div>
        <h2>Todo List Performance</h2>

        <TodoInput onAdd={handleAdd} loading={loading} />

        {loading && <p>Loading...</p>}

        {error && (
          <p style={{ color: 'red' }}>Error: {error}</p>
        )}

        {!loading && !error && (
          <>
            <TodoList
              todos={todos}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />

            <div style={{ marginTop: 8 }}>
              Số lượng: {todos.length}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Exercise5;