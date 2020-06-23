import React, { createContext, useContext, useReducer } from "react";
import reducer, { ITEM_ADD } from "./reducer";

const TodoContext = createContext();
const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(window.localStorage.getItem("todos")) || {}
  );

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const { state, dispatch } = useContext(TodoContext);
  return { state, dispatch };
};

export default TodoProvider;
