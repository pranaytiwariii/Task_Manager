import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskFilter, SortField, SortOrder } from '../types/task';

interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  sortField: SortField;
  sortOrder: SortOrder;
  loading: boolean;
  error: string | null;
  selectedTasks: string[];
}

const initialState: TaskState = {
  tasks: [],
  filter: {
    status: 'all',
    dueDate: 'all',
    priority: 'all',
    search: '',
  },
  sortField: 'createdAt',
  sortOrder: 'desc',
  loading: false,
  error: null,
  selectedTasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTasks: (state, action: PayloadAction<string[]>) => {
      state.tasks = state.tasks.filter(task => !action.payload.includes(task.id));
      state.selectedTasks = state.selectedTasks.filter(id => !action.payload.includes(id));
    },
    setFilter: (state, action: PayloadAction<Partial<TaskFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    setSorting: (state, action: PayloadAction<{ field: SortField; order: SortOrder }>) => {
      state.sortField = action.payload.field;
      state.sortOrder = action.payload.order;
    },
    toggleTaskSelection: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const index = state.selectedTasks.indexOf(taskId);
      if (index === -1) {
        state.selectedTasks.push(taskId);
      } else {
        state.selectedTasks.splice(index, 1);
      }
    },
    clearSelection: (state) => {
      state.selectedTasks = [];
    },
    reorderTasks: (state, action: PayloadAction<{ tasks: Task[] }>) => {
      state.tasks = action.payload.tasks;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTasks,
  setFilter,
  setSorting,
  toggleTaskSelection,
  clearSelection,
  reorderTasks,
} = taskSlice.actions;

export default taskSlice.reducer;