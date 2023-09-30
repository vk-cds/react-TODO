import { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });

    // setTodos([
    //   ...todos,
    //   { id: crypto.randomUUID(), title: newItem, completed: false },
    // ]);

    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id == id) {
          // todo.completed = completed;
          return { ...todo, completed };
          // console.log(todo);
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id != id);
    });
  }

  // console.log(newItem);
  // console.log(todos);

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            id="item"
            type="text"
          />
        </div>
        <button className="btn">ADD</button>
      </form>

      <h1 className="header">ToDo List</h1>
      <ul className="list">
        {todos.length === 0 && "no Todos"}
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          );
        })}

        {/* {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input type="checkbox" />
                {todo.title}
              </label>
              <button className="delete">Delete</button>
            </li>
          );
        })} */}

        {/* <li>
          <label>
            <input type="checkbox" />
            item2
          </label>
          <button className="delete">Delete</button>
        </li> */}
      </ul>
    </>
  );
}
export default App;
