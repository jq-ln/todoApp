import { useEffect, useState } from 'react';
import { Modal } from './components/Modal';
import axios from 'axios';
import './App.css';

//--------------------------------------------------
// => HELPER FUNCTIONS
//--------------------------------------------------

const dueDate = (todo: any) => {
  if (todo.month && todo.year) {
    return todo.month + "/" + todo.year.slice(-2);
  }

  return "No Due Date";
}

//--------------------------------------------------
// => INTERFACES AND TYPES
//--------------------------------------------------

//--------------------------------------------------
// => CHILD COMPONENTS
//--------------------------------------------------

const Todo = ((props: any) => {
  const [isChecked, setIsChecked] = useState(props.todo.completed);
  const status = props.todo.completed ? "COMPLETED" : "PENDING";

  const handleCheck = () => {
    setIsChecked(!isChecked);
    props.onUpdate(props.todo.id, {completed: !isChecked});
  }

  return (
    <div className="todo" >
      <label className="main">
        <em>{status}</em> -- {props.todo.title} -- {dueDate(props.todo)} 
        <input
          type="checkbox"
          defaultChecked={isChecked}
          id={props.todo.id}
          onChange={handleCheck}
        />
        <span className="check"></span>
      </label>
    </div>
  );
});

//--------------------------------------------------
// => MAIN COMPONENT
//--------------------------------------------------

const App = () => {
  const [todos, setTodos] = useState([])
  const [header, setHeader] = useState('All Todos')
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    (async () => {
      await resetTodos();
    })();
  }, []);

  //------------------------------------------------
  // => HELPER FUNCTIONS
  //------------------------------------------------

  const baseUrl = "http://localhost:3000/api"

  const getTodos = async () => {
    return await axios.get(baseUrl + "/todos")
      .then((response) => {
        return response.data;
    })
  }

  const updateTodo = async (id: string, updateValues: any) => {
    return await axios.put(baseUrl + "/todos/" + id, updateValues)
      .then(response => {
        return response.data;
      });
  }

  const addTodo = async (todo: any) => {
    await axios.post(baseUrl + "/todos", todo)
      .then((_response) => {
        resetTodos();
      })
  }

  const resetTodos = async () => {
    await getTodos()
      .then(todos => {
        setTodos(todos);
      });
  }

  const updateAndReset = async (todo: any, updateValues: any) => {
    await updateTodo(todo, updateValues)
      .then(() => resetTodos());
  }

  const handleModalClick = (event: any) => {
    if (event.target.tagName === "FORM" && displayModal) {
      setDisplayModal(false);
    }
  }

  const handleModalSubmit = (todo: any) => {
    //const allTodoIds = todos.map((todo: any) => todo.id);
    //
    //if (allTodoIds.includes(todo.id)) {
    //  updateTodo(todo.id, todo);
    //} else {
      addTodo(todo);
    //}
    setDisplayModal(false);
  }

  const pendingTodos: any[] = todos.filter((todo: any) => !todo.completed )
  const completedTodos: any[] = todos.filter((todo: any) => todo.completed);
  const allTodos: any[] = pendingTodos.concat(completedTodos);

  //------------------------------------------------
  // => Return
  //------------------------------------------------

  return (
    <div className="container">
      <div className="sidebar">
      </div>

      <div className="content" onClick={handleModalClick}>
        <h1>{header}:</h1>
        <div className="add">
          <a href="#" onClick={() => setDisplayModal(true)}>
            <span className="plus"></span>
            Add New Todo
          </a>
          <hr/>
        </div>
        <div className="todos">
          {allTodos.map((todo: any) => {
            return (<Todo key={todo.id} todo={todo} onUpdate={updateAndReset} />);
          })}
        </div>
        <Modal display={displayModal} handleSubmit={handleModalSubmit} />
      </div>
    </div>
  )
}

export default App;
