import Chip from '@mui/material/Chip';
import { FilterType, TodoFilterProps } from '../../config/types'

import './todoFilter.css'

const TodoFilter = ({ filter, setFilter }: TodoFilterProps) => {

  const setClassName = (chipFilter: FilterType, filter: FilterType): string => {
    return chipFilter === filter ? "chip chip__active" : "chip";
  }

  return (
    <div className="filter" data-testid="todo-filter">
      <Chip
        className={setClassName(FilterType.All, filter)}
        label="All"
        onClick={() => setFilter(FilterType.All)}
      />
      <Chip
        className={setClassName(FilterType.Completed, filter)}
        label="Completed"
        onClick={() => setFilter(FilterType.Completed)}
      />
      <Chip
        className={setClassName(FilterType.Active, filter)}
        label="Active"
        onClick={() => setFilter(FilterType.Active)}
      />
    </div>
  )
}

export default TodoFilter