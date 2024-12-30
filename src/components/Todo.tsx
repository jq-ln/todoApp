import { useState } from "react";
import { TodoProps, TodoType } from "../types";

export const Todo = ((props: TodoProps) => {
  const [isChecked, setIsChecked] = useState(props.todo.completed);

  const isValidDate = (month: string, year: string) => {
    const validRegEx = /^[\d]+$/;

    return validRegEx.test(month + year);
  }

  const dueDate = (todo: TodoType) => {
    if (isValidDate(todo.month, todo.year)) {
      return todo.month + "/" + todo.year.slice(-2);
    }

    return "No Due Date";
  }

  const handleCheck = () => {
    setIsChecked(!isChecked);
    props.onUpdate(props.todo.id, {completed: !isChecked});
  }

  const onDelete = () => {
    props.onDelete(props.todo.id);
  }

  // Multiple `label` elements due to CSS structure
  // Not high priority, but should be fixed
  return (
    <div className="todo" >
      <label className="main">
        <input
          type="checkbox"
          defaultChecked={isChecked}
          id={String(props.todo.id)}
          onChange={handleCheck}
        />
        <span className="check"></span>
      </label>
      <label onClick={() => props.handleClick(props.todo)} className={isChecked ? "completed" : ""}>
        {props.todo.title} -- {dueDate(props.todo)} 
      </label>
      <button className="delete" onClick={onDelete}>Delete</button>
    </div>
  );
});

