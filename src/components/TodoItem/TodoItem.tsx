import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { TodoItemProps } from "../../config/types";
import CloseIcon from '@mui/icons-material/Close';

const TodoItem = ({ todoInfo, toggleCompleted, deleteTodo }: TodoItemProps) => {

  const toggleItemCompleted = () => toggleCompleted(todoInfo.id);
  const deleteTodoItem = () => deleteTodo(todoInfo.id);

  return (
    <ListItem className="todo-item">
      <ListItemButton onClick={toggleItemCompleted}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todoInfo.isCompleted}
          />
        </ListItemIcon>
        <ListItemText
          data-testid="todo-text"
          primary={todoInfo.text}
          style={{ textDecoration: todoInfo.isCompleted ? 'line-through' : 'none' }}
        />
        <ListItemIcon onClick={deleteTodoItem} data-testid="todo-delete">
          <CloseIcon />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;