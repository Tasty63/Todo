import { useState } from 'react'
import TodoList from './components/TodoList/TodoList'

import './app.css'
import { AddTodoFn, DeleteTodoFn, FilterType, GetFilteredTodosFn, TodoItemType, ToggleCompleteFn } from './config/types';
import { testTodos } from './config/constants';
import TodoForm from './components/TodoForm/TodoForm';
import TodoFilter from './components/TodoFilter/TodoFilter';

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(testTodos);
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
        </div>
      </div>

    </div>
  )
}

export default App
