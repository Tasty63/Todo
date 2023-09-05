export type TodoItemType = {
  id: number;
  text: string;
  isCompleted: boolean;
}

export enum FilterType {
  All = "all",
  Completed = "Completed",
  Active = "Active"
}

export type ToggleCompleteFn = (id: number) => void;
export type AddTodoFn = (text: string) => void;
export type DeleteTodoFn = (id: number) => void;
export type GetFilteredTodosFn = (todos: TodoItemType[], filter: FilterType) => TodoItemType[];

export interface TodoFormProps {
  addTodo: AddTodoFn,
}

export interface TodoItemProps {
  todoInfo: TodoItemType,
  toggleCompleted: ToggleCompleteFn,
  deleteTodo: DeleteTodoFn,
}

export interface TodoListPropw {
  toggleComplete: ToggleCompleteFn,
  deleteTodo: DeleteTodoFn,
  todos: TodoItemType[]
}

export interface TodoFilterProps {
  filter: FilterType,
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>
}