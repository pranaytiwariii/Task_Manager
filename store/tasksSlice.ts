import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
}

interface TasksState {
  tasks: Task[]
  filter: 'all' | 'completed' | 'pending' | 'overdue'
}

const initialState: TasksState = {
  tasks: [],
  filter: 'all',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newTask = { ...action.payload, id: Date.now().toString() }
      state.tasks.push(newTask)
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    setFilter: (state, action: PayloadAction<TasksState['filter']>) => {
      state.filter = action.payload
    },
    reorderTasks: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const { startIndex, endIndex } = action.payload;
      const [reorderedItem] = state.tasks.splice(startIndex, 1);
      state.tasks.splice(endIndex, 0, reorderedItem);
    },
  },
})

export const { addTask, editTask, deleteTask, toggleTaskCompletion, setFilter, reorderTasks } = tasksSlice.actions

export default tasksSlice.reducer

