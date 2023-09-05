import React, { useState } from 'react';
import { TodoFormProps } from '../../config/types';
import { IconButton, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import './todoform.css'

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [text, setText] = useState<string>('');

  const onTodoAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (text.trim() !== '') {
      addTodo(text);
      setText('');
    }
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setText(event.target.value)

  return (
    <form className="todo-form" onSubmit={onTodoAdd}>
      <TextField
        fullWidth
        id="todo"
        label="Add Todo"
        name="todo"
        autoFocus
        value={text}
        onChange={onTextChange}
      />
      <IconButton
        className="todo-form__button"
        aria-label="add"
        type="submit"
      >
        <AddBoxIcon className="todo-form__icon" color='primary' />
      </IconButton>
    </form>
  );
};

export default TodoForm;