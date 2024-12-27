import { useEffect, useState } from 'react';
import { Modal } from './components/Modal';
import { Todo } from './components/Todo';
import { FormDataType, TodoType } from './types';
import { getTodos, updateTodo, addTodo } from './services/todo';
import './App.css';

const App = () => {
  const emptyFormData = {
    title: "",
    day: "",
    month: "",
    year: "",
    description: "",
    completed: false,
  }

  const [todos, setTodos] = useState<TodoType[]>([])
  const [header, _setHeader] = useState<string>('All Todos')
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>(emptyFormData)

  useEffect(() => {
    (async () => {
      await resetTodos();
    })();
  }, []);

  //------------------------------------------------
  // => HELPER FUNCTIONS
  //------------------------------------------------

  const resetTodos = async () => {
    await getTodos()
      .then(todos => {
        setTodos(todos);
      });
  }

  const addAndReset = async (todo: TodoType) => {
    addTodo(todo)
      .then(() => {
        resetTodos();
      });
  }

  const updateAndReset = async (id: number, updateValues: Partial<FormDataType>) => {
    await updateTodo(id, updateValues)
      .then(() => resetTodos());
  }

  // Problem with tsserver -- type of `event` set via suggestion, but `cannot find name` error
  const handleModalClick = (event: MouseEventHandler<HTMLDivElement>) => {
    if (
      event.target                    &&
      'tagName' in event.target       &&
      event.target.tagName === "FORM" &&
      displayModal
    ) {
      setDisplayModal(false);
    }
  }

  const handleModalSubmit = (todo: TodoType) => {
    const allTodoIds = todos.map((todo: TodoType) => todo.id);

    if (allTodoIds.includes(todo.id)) {
      updateAndReset(todo.id, { ...todo });
    } else {
      addAndReset(todo);
    }
    setDisplayModal(false);
  }

  const handleTodoClick = (todo: FormDataType) => {
    setFormData(todo);
    setDisplayModal(true);
  }

  const pendingTodos: TodoType[] = todos.filter((todo: any) => !todo.completed )
  const completedTodos: TodoType[] = todos.filter((todo: any) => todo.completed);
  const allTodos: TodoType[] = pendingTodos.concat(completedTodos);

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
          <a href="#" onClick={() => handleTodoClick(emptyFormData)}>
            <span className="plus"></span>
            Add New Todo
          </a>
          <hr/>
        </div>
        <div className="todos">
          {allTodos.map((todo: any) => {
            return (<Todo key={todo.id} todo={todo} handleClick={handleTodoClick} onUpdate={updateAndReset} />);
          })}
        </div>
        {displayModal && <Modal display={displayModal} formData={formData} handleSubmit={handleModalSubmit} />}
      </div>
    </div>
  )
}

export default App;
