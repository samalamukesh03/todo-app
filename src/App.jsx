import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  function addTask(e) {
    e.preventDefault();

    if (input.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      },
    ]);

    setInput("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  const completed = tasks.filter((task) => task.completed).length;
  const remaining = tasks.length - completed;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <main className="app">
      <header className="header">
        <div className="logo">✓</div>
        <h1>My Tasks</h1>
        <p>Plan your day. Make progress.</p>
      </header>

      <section className="todo-card">
        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">+ Add</button>
        </form>

        <div className="stats">
          <span>{remaining} remaining</span>
          <span>{completed} completed</span>
        </div>

        <div className="filters">
          {["All", "Active", "Completed"].map((item) => (
            <button
              key={item}
              className={filter === item ? "selected" : ""}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <li className="empty">No tasks yet. Add a task above!</li>
          ) : (
            filteredTasks.map((task) => (
              <li className="task" key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? "done" : ""}>
                    {task.text}
                  </span>
                </label>

                <button
                  className="delete"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                >
                  ×
                </button>
              </li>
            ))
          )}
        </ul>

        <footer className="footer">
          <span>{tasks.length} total tasks</span>
          <button
            type="button"
            onClick={clearCompleted}
            disabled={completed === 0}
          >
            Clear completed
          </button>
        </footer>
      </section>

      <p className="bottom-text">
        Small steps every day lead to big results.
      </p>
    </main>
  );
}

export default App;