import { useEffect, useState } from 'react';
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
  const [isChecked, setIsChecked] = useState(props.todo.completed)
  const status = props.todo.completed ? "COMPLETED" : "PENDING";

  const handleCheck = () => {
    setIsChecked(!isChecked);
    props.onUpdate(props.todo.id, {completed: !isChecked})
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
  )
})

const Modal = (props: any) => {
  const [formData, setFormData] = useState({
    title: "",
    day: "",
    month: "",
    year: "",
    description: "",
  })

  const display = props.display ? "modal display-block" : "modal display-none"

  const days = [];
  const months = ["January", "February", "March",
                  "April",   "May",      "June",
                  "July",    "August",   "September",
                  "October", "November", "December"];

  const years = ["2020", "2021", "2022", "2023", "2024", "2025"];

  for (let day = 1; day <= 31; day++) {
    days.push(String(day));
  }

  const handleChange = (event: any) => {
    const [name, value] = [event.target.name, event.target.value]
    const updated = {};
    updated[name] = value;
    setFormData({...formData, ...updated});
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <form className={display} action="" method="post" onSubmit={handleSubmit}>
      <fieldset className="modal-main">
        <ul>
          <li>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" placeholder="Item 1" onChange={handleChange} />
          </li>
          <li>
            <label htmlFor="due">Due Date</label>
            <div className="date">
              <select id="due_day" name="day" onChange={handleChange}>
                <option>Day</option>
                {days.map(day => {
                  return (
                    <option key={"day" + day} value={day}>{day}</option>
                  )
                })}
              </select>
              /
              <select id="due_month" name="month" onChange={handleChange}>
                <option>Month</option>
                {months.map((month, idx) => {
                  return (
                    <option key={"month" + (idx + 1)} value={month}>{month}</option>
                  )
                })}
              </select>
              /
              <select id="due_year" name="year" onChange={handleChange}>
                <option>Year</option>
                {years.map((year) => {
                  return (
                    <option key={"year" + year}>{year}</option>
                  )
                })}
              </select>
            </div>
          </li>
          <li>
            <label htmlFor="description">Description</label>
            <textarea
              cols="40"
              rows="7"
              id="description"
              name="description"
              placeholder="Description..."
              onChange={handleChange}
              ></textarea>
          </li>
        </ul>
        <div className="modal-buttons">
          <input type="submit" value="Save" />
          <button name="complete">Mark As Complete</button>
        </div>
      </fieldset>
    </form>
  );
}

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
        <Modal display={displayModal} />
      </div>
    </div>
  )
}

export default App;
