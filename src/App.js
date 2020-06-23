import React, { useReducer, useState } from "react";
import { ITEM_ADD } from "./reducer";
import TodoItem from "./TodoItem";
import { useTodoContext } from "./Context";

const FormInput = () => {
  const [inputTodo, setInputTodo] = useState("");
  const { dispatch } = useTodoContext();

  const onChange = (e) => {
    setInputTodo(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ITEM_ADD, payload: inputTodo });
    setInputTodo("");
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Write your things to do"
        onChange={onChange}
        value={inputTodo}
      />
      <input type="submit" value="TODO" />
    </form>
  );
};

const DisplayList = () => {
  const { state, dispatch } = useTodoContext();

  return (
    <>
      <div>
        {state?.todos?.length > 0 ? (
          <h2>Your list things to do</h2>
        ) : (
          <h2>You have nothing to do. Try something.</h2>
        )}
        <ul>
          {state.todos &&
            state?.todos?.map((todo) => (
              <TodoItem
                id={todo.id}
                key={todo.id}
                dispatch={dispatch}
                isCompleted={todo.isCompleted}
                todo={todo.todo}
              />
            ))}
        </ul>
      </div>
      <div>
        {state?.completed?.length > 0 && (
          <>
            <h2>Your todos completed</h2>
            <ul>
              {state?.completed?.map((todo) => (
                <TodoItem
                  id={todo.id}
                  key={todo.id}
                  dispatch={dispatch}
                  isCompleted={todo.isCompleted}
                  todo={todo.todo}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <div>
        <h1>Todo list with React useReducer</h1>
        <FormInput />
      </div>
      <div>
        <DisplayList />
      </div>
    </>
  );
}

export default App;
