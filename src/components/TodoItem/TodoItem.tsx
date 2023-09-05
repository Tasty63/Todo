import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { TodoItemProps } from "../../config/types";
import CloseIcon from '@mui/icons-material/Close';

import './todoItem.css';

const TodoItem = ({ todoInfo, toggleCompleted, deleteTodo }: TodoItemProps) => {

  const toggleItemCompleted = () => toggleCompleted(todoInfo.id);
  const deleteTodoItem = () => deleteTodo(todoInfo.id);

  return (
    <ListItem className="todo-item">
      <ListItemButton role={undefined} onClick={toggleItemCompleted}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todoInfo.isCompleted}
          />
        </ListItemIcon>
        <ListItemText
          primary={todoInfo.text}
          style={{ textDecoration: todoInfo.isCompleted ? 'line-through' : 'none' }}
        />
        <ListItemIcon onClick={deleteTodoItem}>
          <CloseIcon />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;