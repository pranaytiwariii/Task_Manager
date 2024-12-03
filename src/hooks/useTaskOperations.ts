import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask, deleteTasks } from '../store/taskSlice';
import { Task, Priority, TaskStatus } from '../types/task';
import { v4 as uuidv4 } from 'uuid';

export const useTaskOperations = () => {
  const dispatch = useDispatch();

  const createTask = useCallback((
    title: string,
    description: string = '',
    dueDate?: string,
    priority: Priority = 'medium',
  ) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      priority,
      status: 'active',
      createdAt: new Date().toISOString(),
      order: Date.now(),
    };
    dispatch(addTask(newTask));
  }, [dispatch]);

  const editTask = useCallback((task: Task) => {
    dispatch(updateTask(task));
  }, [dispatch]);

  const removeTask = useCallback((taskIds: string[]) => {
    dispatch(deleteTasks(taskIds));
  }, [dispatch]);

  const toggleTaskStatus = useCallback((task: Task) => {
    const newStatus: TaskStatus = task.status === 'active' ? 'completed' : 'active';
    dispatch(updateTask({ ...task, status: newStatus }));
  }, [dispatch]);

  return {
    createTask,
    editTask,
    removeTask,
    toggleTaskStatus,
  };
};