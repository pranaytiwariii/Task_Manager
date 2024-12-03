import React from 'react';
import { List, Tag, Checkbox, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Task } from '../../types/task';
import { priorityColors } from '../../utils/taskUtils';
import { formatDate } from '../../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  selected: boolean;
  onSelect: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusToggle: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onStatusToggle,
}) => {
  return (
    <List.Item
      key={task.id}
      actions={[
        <Tooltip title="Edit" key="edit">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(task)}
            type="text"
          />
        </Tooltip>,
        <Tooltip title="Delete" key="delete">
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(task.id)}
            type="text"
            danger
          />
        </Tooltip>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Checkbox
            checked={selected}
            onChange={() => onSelect(task.id)}
          />
        }
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => onStatusToggle(task)}
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
                Due: {formatDate(task.dueDate)}
              </div>
            )}
          </div>
        }
      />
    </List.Item>
  );
};