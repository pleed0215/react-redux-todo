import React, { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";

const ITEM_ADD = "@todo_item_add";
const ITEM_REMOVE = "@todo_item_remove";

const reducer = (state, action) => {
  switch (action.type) {
    case ITEM_ADD: {
      const newState =
        state && state.todos && state.todos.length > 0
          ? {
              ...state,
              todos: [...state.todos, { id: uuid(), todo: action.payload }],
            }
          : { ...state, todos: [{ id: uuid(), todo: action.payload }] };
      window.localStorage.setItem("todos", JSON.stringify(newState));
      return newState;
    }
    case ITEM_REMOVE: {
      const newTodo = state.todos.filter((i) => i.id !== action.payload);
      const newState = { ...state, todos: newTodo };
      window.localStorage.setItem("todos", JSON.stringify(newState));
      return newState;
    }
    default:
      return;
  }
};

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(window.localStorage.getItem("todos")) || {}
  );
  console.log(state);

  const [inputTodo, setInputTodo] = useState("");

  const onChange = (e) => {
    setInputTodo(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ITEM_ADD, payload: inputTodo });
    setInputTodo("");
  };

  const onRemoveClick = (e) => {
    const id = parseInt(e.target.parentNode.id);
    console.log(id);
    dispatch({ type: ITEM_REMOVE, payload: id });
  };

  return (
    <div>
      <h1>Todo list with React useReducer</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Write your things to do"
          onChange={onChange}
          value={inputTodo}
        />
        <input type="submit" value="TODO" />
      </form>
      <h2>Your list things to do</h2>
      <ul>
        {state?.todos?.map((todo) => (
          <li id={todo.id} key={todo.id}>
            <span>{todo.todo}</span>
            <button onClick={onRemoveClick}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
