import { Task, Priority, TaskStatus } from '../types/task';

export const priorityColors: Record<Priority, string> = {
  high: 'red',
  medium: 'orange',
  low: 'green',
};

export const priorityWeight: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const getTaskStatusText = (status: TaskStatus): string => {
  return status === 'active' ? 'In Progress' : 'Completed';
};

export const sortTasksByPriority = (tasks: Task[], ascending: boolean = false): Task[] => {
  return [...tasks].sort((a, b) => {
    const multiplier = ascending ? 1 : -1;
    return multiplier * (priorityWeight[b.priority] - priorityWeight[a.priority]);
  });
};

export const sortTasksByDueDate = (tasks: Task[], ascending: boolean = false): Task[] => {
  return [...tasks].sort((a, b) => {
    const multiplier = ascending ? 1 : -1;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return multiplier * (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  });
};