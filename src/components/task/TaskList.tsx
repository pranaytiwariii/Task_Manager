import React from 'react';
import { List } from 'antd';
import { Task } from '../../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  selectedTasks: string[];
  onTaskSelect: (taskId: string) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskStatusToggle: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectedTasks,
  onTaskSelect,
  onTaskEdit,
  onTaskDelete,
  onTaskStatusToggle,
}) => {
  return (
    <List
      dataSource={tasks}
      renderItem={(task) => (
        <TaskItem
          key={task.id}
          task={task}
          selected={selectedTasks.includes(task.id)}
          onSelect={onTaskSelect}
          onEdit={onTaskEdit}
          onDelete={onTaskDelete}
          onStatusToggle={onTaskStatusToggle}
        />
      )}
    />
  );
};