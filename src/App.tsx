import { SyntheticEvent, useEffect, useState } from 'react';
import { Modal } from './components/Modal';
import { Todo } from './components/Todo';
import { FormDataType, TodoType } from './types';
import { getTodos, updateTodo, addTodo, deleteTodo } from './services/todo';
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
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>(emptyFormData)

  useEffect(() => {
    (async () => {
      await resetTodos();
    })();
  }, []);

  const resetTodos = async () => {
    await getTodos()
      .then(todos => {
        setTodos(todos);
      });
  }

  const addAndReset = async (todo: FormDataType) => {
    addTodo(todo)
      .then(() => {
        resetTodos();
      });
  }

  const updateAndReset = async (id: number, updateValues: Partial<FormDataType>) => {
    await updateTodo(id, updateValues)
      .then(() => resetTodos());
  }

  const handleModalClick = (event: SyntheticEvent) => {
    if (
      event.target                    &&
      'tagName' in event.target       &&
      event.target.tagName === "FORM" &&
      displayModal
    ) {
      setDisplayModal(false);
    }
  }

  const handleModalSubmit = (todo: FormDataType) => {
    const allTodoIds = todos.map((todo: TodoType) => todo.id);

    if (
      "id" in todo                &&
      typeof todo.id === "number" &&
      allTodoIds.includes(todo.id)
      ) {
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

  const handleDelete = async (id: number) => {
    await deleteTodo(id)
      .then(() => {
        resetTodos();
      });
  }

  const pendingTodos: TodoType[] = todos.filter((todo: TodoType) => !todo.completed )
  const completedTodos: TodoType[] = todos.filter((todo: TodoType) => todo.completed);
  const allTodos: TodoType[] = pendingTodos.concat(completedTodos);

  return (
    <div className="container">
      <div className="sidebar">
      </div>

      <div className="content" onClick={handleModalClick}>
        <h1>All Todos <span className="count">{allTodos.length}</span></h1>
        <div className="add">
          <a href="#" onClick={() => handleTodoClick(emptyFormData)}>
            <span className="plus"></span>
            Add New Todo
          </a>
          <hr/>
        </div>
        <div className="todos">
          {allTodos.map((todo: TodoType) => {
            return (<Todo key={todo.id} todo={todo} handleClick={handleTodoClick} onUpdate={updateAndReset} onDelete={handleDelete} />);
          })}
        </div>
        {displayModal && <Modal display={displayModal} formData={formData} handleSubmit={handleModalSubmit} />}
      </div>
    </div>
  )
}

export default App;
