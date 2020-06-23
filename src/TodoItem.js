import React, { useState } from "react";
import {
  ITEM_COMPLETE,
  ITEM_UNCOMPLETE,
  ITEM_REMOVE,
  ITEM_MODIFY,
} from "./reducer";

export default ({ dispatch, isCompleted, todo, ...props }) => {
  const [checked, setCheck] = useState(isCompleted);
  const [inputTodo, setTodo] = useState();
  const [displayEdit, setDisplayEdit] = useState(false);

  const onChecked = () => {
    console.log("checked");
    if (!checked) {
      console.log("completed");
      dispatch({
        type: ITEM_COMPLETE,
        payload: props.id,
      });
    } else {
      console.log("uncompleted");
      dispatch({
        type: ITEM_UNCOMPLETE,
        payload: props.id,
      });
    }
    setCheck(!checked);
  };

  const onRemoveClick = (e) => {
    dispatch({
      type: ITEM_REMOVE,
      payload: { id: e.target.parentNode.id, isCompleted: checked },
    });
  };
  const onEditClick = (e) => {
    if (!displayEdit) {
      setTodo(todo);
    } else if (displayEdit && inputTodo !== todo) {
      console.log(inputTodo);
      console.log(todo);
      dispatch({
        type: ITEM_MODIFY,
        payload: {
          id: props.id,
          modifyText: inputTodo,
          isTodo: checked,
        },
      });
    }
    setDisplayEdit(!displayEdit);
  };

  const onChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <li id={props.id} key={props.key}>
      <input
        type="checkbox"
        value={checked}
        onChange={onChecked}
        checked={isCompleted}
      />
      {displayEdit && (
        <input type="text" value={inputTodo} onChange={onChange} />
      )}
      {!displayEdit && <span>{todo}</span>}
      <button onClick={onEditClick}>{displayEdit ? "Done" : "Edit"}</button>
      <button onClick={onRemoveClick}>🗑</button>
    </li>
  );
};
