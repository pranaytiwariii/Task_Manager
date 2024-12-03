import { isToday, isThisWeek, isPast, parseISO } from 'date-fns';

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const isTaskDueToday = (dueDate) => {
  return isToday(parseISO(dueDate));
};

export const isTaskDueThisWeek = (dueDate) => {
  return isThisWeek(parseISO(dueDate));
};

export const isTaskOverdue = (dueDate) => {
  return isPast(parseISO(dueDate)) && !isToday(parseISO(dueDate));
};