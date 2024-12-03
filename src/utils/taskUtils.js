export const priorityColors = {
  high: 'red',
  medium: 'orange',
  low: 'green',
};

export const priorityWeight = {
  high: 3,
  medium: 2,
  low: 1,
};

export const getTaskStatusText = (status) => {
  return status === 'active' ? 'In Progress' : 'Completed';
};

export const sortTasksByPriority = (tasks, ascending = false) => {
  return [...tasks].sort((a, b) => {
    const multiplier = ascending ? 1 : -1;
    return multiplier * (priorityWeight[b.priority] - priorityWeight[a.priority]);
  });
};

export const sortTasksByDueDate = (tasks, ascending = false) => {
  return [...tasks].sort((a, b) => {
    const multiplier = ascending ? 1 : -1;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return multiplier * (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  });
};