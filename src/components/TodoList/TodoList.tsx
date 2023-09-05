import { List } from "@mui/material"
import { TodoListPropw } from "../../config/types"
import TodoItem from "../TodoItem/TodoItem"

import './todoList.css'

const TodoList = ({ todos, toggleComplete, deleteTodo }: TodoListPropw) => {
  return (
    <List className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todoInfo={todo}
          toggleCompleted={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </List>
  )
}

export default TodoList