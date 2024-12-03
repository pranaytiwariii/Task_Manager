import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setFilter, setSorting } from '../store/taskSlice';
import { TaskFilter, SortField, SortOrder } from '../types/task';
import { isToday, isThisWeek, isPast, parseISO } from 'date-fns';

export const useTaskFilters = () => {
  const dispatch = useDispatch();
  const { filter, sortField, sortOrder, tasks } = useSelector((state: RootState) => state.tasks);

  const updateFilter = useCallback((newFilter: Partial<TaskFilter>) => {
    dispatch(setFilter(newFilter));
  }, [dispatch]);

  const updateSorting = useCallback((field: SortField, order: SortOrder) => {
    dispatch(setSorting({ field, order }));
  }, [dispatch]);

  const getFilteredTasks = useCallback(() => {
    return tasks.filter(task => {
      // Status filter
      if (filter.status !== 'all' && task.status !== filter.status) return false;

      // Priority filter
      if (filter.priority !== 'all' && task.priority !== filter.priority) return false;

      // Due date filter
      if (filter.dueDate !== 'all' && task.dueDate) {
        const dueDate = parseISO(task.dueDate);
        switch (filter.dueDate) {
          case 'today':
            if (!isToday(dueDate)) return false;
            break;
          case 'week':
            if (!isThisWeek(dueDate)) return false;
            break;
          case 'overdue':
            if (!isPast(dueDate) || isToday(dueDate)) return false;
            break;
        }
      }

      // Search filter
      if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      switch (sortField) {
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return multiplier * (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        case 'priority':
          const priorityWeight = { high: 3, medium: 2, low: 1 };
          return multiplier * (priorityWeight[b.priority] - priorityWeight[a.priority]);
        default:
          return multiplier * (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    });
  }, [tasks, filter, sortField, sortOrder]);

  return {
    filter,
    sortField,
    sortOrder,
    updateFilter,
    updateSorting,
    getFilteredTasks,
  };
};