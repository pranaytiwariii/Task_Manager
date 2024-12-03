import { isToday, isThisWeek, isPast, parseISO } from 'date-fns';

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const isTaskDueToday = (dueDate: string) => {
  return isToday(parseISO(dueDate));
};

export const isTaskDueThisWeek = (dueDate: string) => {
  return isThisWeek(parseISO(dueDate));
};

export const isTaskOverdue = (dueDate: string) => {
  return isPast(parseISO(dueDate)) && !isToday(parseISO(dueDate));
};