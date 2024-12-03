import React from 'react';
import { List } from 'antd';
import { TaskItem } from './TaskItem';

export const TaskList = ({
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