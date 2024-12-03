import React from 'react';
import { List, Tag, Checkbox, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Task } from '../types/task';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  selectedTasks: string[];
  onTaskSelect: (taskId: string) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskStatusToggle: (task: Task) => void;
}

const priorityColors = {
  high: 'red',
  medium: 'orange',
  low: 'green',
};

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectedTasks,
  onTaskSelect,
  onTaskEdit,
  onTaskDelete,
}) => {
  return (
    <List
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item
          key={task.id}
          actions={[
            <Tooltip title="Edit">
              <Button
                icon={<EditOutlined />}
                onClick={() => onTaskEdit(task)}
                type="text"
              />
            </Tooltip>,
            <Tooltip title="Delete">
              <Button
                icon={<DeleteOutlined />}
                onClick={() => onTaskDelete(task.id)}
                type="text"
                danger
              />
            </Tooltip>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Checkbox
                checked={selectedTasks.includes(task.id)}
                onChange={() => onTaskSelect(task.id)}
              />
            }
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </span>
                <Tag color={priorityColors[task.priority]}>
                  {task.priority}
                </Tag>
              </div>
            }
            description={
              <div>
                {task.description && <div>{task.description}</div>}
                {task.dueDate && (
                  <div>
                    Due: {format(new Date(task.dueDate), 'PPP')}
                  </div>
                )}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};