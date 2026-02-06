import React, { useState, useCallback, memo } from "react";

// TodoItem: chỉ re-render khi props thay đổi
const TodoItem = memo(function TodoItem({ todo, onDelete, onToggle }) {
  console.log("render item", todo.id);
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
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: 8 }}>
        Xóa
      </button>
    </li>
  );
});

function TodoInput({ onAdd }) {
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
      <button onClick={handleAdd}>Thêm</button>
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
        borderRadius: 8,
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

function Exercise4() {
  // Tạo list lớn để test performance
  const [todos, setTodos] = useState(() =>
    Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      text: `Todo ${i + 1}`,
      completed: false,
    })),
  );

  // useCallback để không tạo lại hàm mới mỗi lần render
  const handleDelete = useCallback((id) => {
    setTodos((todos) => todos.filter((t) => t.id !== id));
  }, []);

  const handleToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const handleAdd = useCallback((text) => {
    setTodos((todos) => [{ id: Date.now(), text, completed: false }, ...todos]);
  }, []);

  return (
    <div>
      <h2>Todo List Performance</h2>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
      <div style={{ marginTop: 8, color: "#888", fontSize: 13 }}>
        Số lượng: {todos.length}
      </div>
    </div>
  );
}

export default Exercise4;
