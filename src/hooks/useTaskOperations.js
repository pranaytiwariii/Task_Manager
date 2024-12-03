import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask, deleteTasks } from '../store/taskSlice';
import { v4 as uuidv4 } from 'uuid';

export const useTaskOperations = () => {
  const dispatch = useDispatch();

  const createTask = useCallback((
    title,
    description = '',
    dueDate,
    priority = 'medium',
  ) => {
    const newTask = {
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

  const editTask = useCallback((task) => {
    dispatch(updateTask(task));
  }, [dispatch]);

  const removeTask = useCallback((taskIds) => {
    dispatch(deleteTasks(taskIds));
  }, [dispatch]);

  const toggleTaskStatus = useCallback((task) => {
    const newStatus = task.status === 'active' ? 'completed' : 'active';
    dispatch(updateTask({ ...task, status: newStatus }));
  }, [dispatch]);

  return {
    createTask,
    editTask,
    removeTask,
    toggleTaskStatus,
  };
};