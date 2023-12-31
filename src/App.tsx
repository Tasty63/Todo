import { useState } from 'react'
import TodoList from './components/TodoList/TodoList'
import { AddTodoFn, DeleteTodoFn, FilterType, GetFilteredTodosFn, TodoItemType, ToggleCompleteFn } from './config/types';
import TodoForm from './components/TodoForm/TodoForm';
import TodoFilter from './components/TodoFilter/TodoFilter';
import Button from '@mui/material/Button';
import './app.css'

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  const addTodo: AddTodoFn = (text) => {
    setTodos((todos) => [...todos, {
      id: todos.length + 1,
      text,
      isCompleted: false,
    }]);
  };

  const deleteTodo: DeleteTodoFn = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((todos) => todos.filter(todo => todo.isCompleted === false))
  }

  const toggleComplete: ToggleCompleteFn = (id) => {
    setTodos((todos) => (
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ))
    );
  };

  const getFilteredTodos: GetFilteredTodosFn = (todos, filter) => {
    return todos.filter((todo) => {
      if (filter === FilterType.All) {
        return true;
      }

      if (filter === FilterType.Completed) {
        return todo.isCompleted;
      }

      return !todo.isCompleted
    });
  }

  const filteredTodos = getFilteredTodos(todos, filter);
  const remainTodos = getFilteredTodos(todos, FilterType.Active).length;

  return (
    <div className="container">
      <div className="todo">
        <div className="todo__body">
          <h1 className="todo__title">TODO APP</h1>
          <TodoForm addTodo={addTodo} />
          <TodoList
            todos={filteredTodos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        </div>
        <div className="todo__footer">
          <div className="todo__count">{remainTodos} items left</div>
          <TodoFilter filter={filter} setFilter={setFilter} />
          <Button onClick={clearCompleted}>Clear completed</Button>
        </div>
      </div>

    </div>
  )
}

export default App
