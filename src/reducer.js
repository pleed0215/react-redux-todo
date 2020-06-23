import { v4 as uuid } from "uuid";

export const ITEM_ADD = "@todo_item_add";
export const ITEM_REMOVE = "@todo_item_remove";
export const ITEM_COMPLETE = "@todo_item_complete";
export const ITEM_UNCOMPLETE = "@todo_item_uncomplete";
export const ITEM_MODIFY = "@todo_item_modify";

export default (state, action) => {
  switch (action.type) {
    // adding item to state. using uuid(), can make random id,
    case ITEM_ADD: {
      const newState =
        state && state.todos && state.todos.length > 0
          ? {
              ...state,
              todos: [
                ...state.todos,
                { id: uuid(), todo: action.payload, isCompleted: false },
              ],
            }
          : {
              ...state,
              todos: [{ id: uuid(), todo: action.payload, isCompleted: false }],
              completed: [],
            };
      window.localStorage.setItem("todos", JSON.stringify(newState));
      return newState;
    }
    case ITEM_REMOVE: {
      console.log(action);
      const newList = action?.payload.isCompleted
        ? state.completed.filter((i) => i.id !== action.payload.id)
        : state.todos.filter((i) => i.id !== action.payload.id);
      const newState = action?.payload.isCompleted
        ? { ...state, completed: newList }
        : { ...state, todos: newList };
      console.log(newState);
      window.localStorage.setItem("todos", JSON.stringify(newState));
      return newState;
    }

    case ITEM_COMPLETE: {
      const indexOfWillRemoveFromTodo = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      const willRemoveTodo = {
        ...state.todos[indexOfWillRemoveFromTodo],
        isCompleted: true,
      };
      const removedTodo = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      const newState = {
        ...state,
        todos: removedTodo,
        completed: [...state.completed, willRemoveTodo],
      };
      window.localStorage.setItem("todos", JSON.stringify(newState));

      return newState;
    }

    case ITEM_UNCOMPLETE: {
      console.log(`actions: ${action}`);
      const indexOfWillRemoveFromCompleted = state.completed.findIndex(
        (todo) => todo.id === action.payload
      );
      const willRemoveCompleted = {
        ...state.completed[indexOfWillRemoveFromCompleted],
        isCompleted: false,
      };
      const removedCompleted = state.completed.filter(
        (todo) => todo.id !== action.payload
      );
      const newState = {
        ...state,
        todos: [...state.todos, willRemoveCompleted],
        completed: removedCompleted,
      };
      window.localStorage.setItem("todos", JSON.stringify(newState));
      return newState;
    }

    case ITEM_MODIFY: {
      let targetTodoIndex, targetTodo, newState;
      if (!action.payload.isTodo) {
        targetTodoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        targetTodo = state.todos[targetTodoIndex];
        newState = {
          ...state,
          todos: [
            ...state.todos.slice(0, targetTodoIndex),
            { ...targetTodo, todo: action.payload.modifyText },
            ...state.todos.slice(targetTodoIndex + 1, state.todos.length),
          ],
        };
      } else {
        targetTodoIndex = state.completed.findIndex(
          (todo) => todo.id === action.payload.id
        );
        targetTodo = state.completed[targetTodoIndex];
        newState = {
          ...state,
          completed: [
            ...state.completed.slice(0, targetTodoIndex),
            { ...targetTodo, todo: action.payload.modifyText },
            ...state.completed.slice(
              targetTodoIndex + 1,
              state.completed.length
            ),
          ],
        };
      }

      window.localStorage.setItem("todos", JSON.stringify(newState));
      return newState;
    }

    default:
      return;
  }
};
