import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTasks: (state, action) => {
      state.tasks = state.tasks.filter(task => !action.payload.includes(task.id));
      state.selectedTasks = state.selectedTasks.filter(id => !action.payload.includes(id));
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    setSorting: (state, action) => {
      state.sortField = action.payload.field;
      state.sortOrder = action.payload.order;
    },
    toggleTaskSelection: (state, action) => {
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
    reorderTasks: (state, action) => {
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