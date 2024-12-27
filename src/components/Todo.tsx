import { useState } from "react";

export const Todo = ((props: any) => {
  const [isChecked, setIsChecked] = useState(props.todo.completed);
  const status = props.todo.completed ? "COMPLETED" : "PENDING";

  const isValidDate = (month: string, year: string) => {
    const validRegEx = /^[\d]+$/;

    return validRegEx.test(month + year);
  }

  const dueDate = (todo: any) => {
    if (isValidDate(todo.month, todo.year)) {
      return todo.month + "/" + todo.year.slice(-2);
    }

    return "No Due Date";
  }


  const handleCheck = () => {
    setIsChecked(!isChecked);
    props.onUpdate(props.todo.id, {completed: !isChecked});
  }

  // Multiple `label` elements due to CSS structure
  // Not high priority, but should be fixed
  return (
    <div className="todo" >
      <label className="main">
        <input
          type="checkbox"
          defaultChecked={isChecked}
          id={props.todo.id}
          onChange={handleCheck}
        />
        <span className="check"></span>
      </label>
      <label onClick={() => props.handleClick(props.todo)}>
        <em >{status}</em> -- {props.todo.title} -- {dueDate(props.todo)} 
      </label>
    </div>
  );
});
