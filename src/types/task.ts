export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'active' | 'completed';
export type SortField = 'dueDate' | 'priority' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
  order: number;
}

export interface TaskFilter {
  status: TaskStatus | 'all';
  dueDate: 'all' | 'today' | 'week' | 'overdue';
  priority: Priority | 'all';
  search: string;
}