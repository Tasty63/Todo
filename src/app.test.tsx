import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import App from './App';
import TodoForm from './components/TodoForm/TodoForm';
import TodoFilter from './components/TodoFilter/TodoFilter';
import { FilterType } from './config/types';

const addTodoMock = jest.fn();
const setFilterMock = jest.fn();

describe('Render', () => {
  it('render app component', () => {
    render(<App />);

    expect(screen.getByTestId('todo-form')).toBeInTheDocument();
    expect(screen.getByTestId('todo-filter')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByText(/TODO APP/)).toBeInTheDocument();
  })
});

describe('Todo List', () => {

  it('add a new todo', async () => {
    render(<App />);
    const textFieldElement = screen.getByLabelText('Add Todo');
    const addButtonElement = screen.getByTestId('add-button');

    await userEvent.type(textFieldElement, 'New Todo');
    await userEvent.click(addButtonElement);

    const todoElement = screen.getByText('New Todo');
    expect(todoElement).toBeInTheDocument();
  });

  it('do not add todo when input is empty', () => {
    render(<TodoForm addTodo={addTodoMock} />)

    const textFieldElement = screen.getByLabelText('Add Todo');
    const addButtonElement = screen.getByTestId('add-button');

    fireEvent.change(textFieldElement, { target: { value: ' ' } });
    fireEvent.click(addButtonElement);

    expect(addTodoMock).toBeCalledTimes(0);
  });

  it('toggle todo status', () => {
    render(<App />)
    const textFieldElement = screen.getByLabelText('Add Todo');
    const addButtonElement = screen.getByTestId('add-button');

    fireEvent.change(textFieldElement, { target: { value: 'New Todo' } });
    fireEvent.click(addButtonElement);

    const todoElement = screen.getByTestId('todo-text');
    fireEvent.click(todoElement);

    expect(todoElement).toHaveStyle("text-decoration: line-through");
  })

  it('delete todo', async () => {
    render(<App />)
    const textFieldElement = screen.getByLabelText('Add Todo');
    const addButtonElement = screen.getByTestId('add-button');
    fireEvent.change(textFieldElement, { target: { value: 'New Todo' } });
    fireEvent.click(addButtonElement);

    const todo = screen.getByText('New Todo')

    expect(todo).toBeInTheDocument();

    const deleteIcon = screen.getByTestId('todo-delete');
    await userEvent.click(deleteIcon);

    expect(todo).not.toBeInTheDocument();
  });

  it('clear completed todos', () => {
    render(<App />)
    const textFieldElement = screen.getByLabelText('Add Todo');
    const addButtonElement = screen.getByTestId('add-button');
    const clearButtonElement = screen.getByText('Clear completed');
    const todoElements = []

    for (let i = 0; i < 3; i++) {
      fireEvent.change(textFieldElement, { target: { value: `New Todo${i}` } });
      fireEvent.click(addButtonElement);
      todoElements.push(screen.getByText(`New Todo${i}`))
    }

    fireEvent.click(todoElements[0]);
    fireEvent.click(todoElements[2]);
    fireEvent.click(clearButtonElement);

    expect(todoElements[0]).not.toBeInTheDocument();
    expect(todoElements[2]).not.toBeInTheDocument();
    expect(todoElements[1]).toBeInTheDocument();
  });
});

describe('Todo Filter', () => {
  it('change filter value', () => {
    render(<TodoFilter filter={FilterType.All} setFilter={setFilterMock} />);

    const completedFilterOption = screen.getByText('Completed');
    const allFilterOption = screen.getByText('All');
    const activeFilterOption = screen.getByText('Active');

    fireEvent.click(allFilterOption);
    fireEvent.click(completedFilterOption);
    fireEvent.click(activeFilterOption);

    expect(setFilterMock).toHaveBeenCalledWith(FilterType.All);
    expect(setFilterMock).toHaveBeenCalledWith(FilterType.Completed);
    expect(setFilterMock).toHaveBeenCalledWith(FilterType.Active);
    expect(setFilterMock).toBeCalledTimes(3);
  });
});

