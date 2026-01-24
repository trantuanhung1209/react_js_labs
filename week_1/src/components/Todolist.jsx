import React from 'react'

function Todolist() {

    const [tasks, setTasks] = React.useState([]);
    const [input, setInput] = React.useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === "") return;
        setTasks([...tasks, input]);
        setInput("");
    }

    const handleDelete = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    }

  return (
    <div>
      <h1>Todo List</h1>
      
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter your task...' value={input} onChange={(e) => setInput(e.target.value)} />
        <button type='submit'>Add Task</button>
      </form>

      <ul>
        {tasks.map((task, index) => (
            <div key={index} 
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <li >{task}</li>
                <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
        ))}
      </ul>
    </div>
  )
}

export default Todolist
