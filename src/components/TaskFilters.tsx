import React from 'react';
import { Space, Select, Input, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TaskFilter } from '../types/task';

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: Partial<TaskFilter>) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ filter, onFilterChange }) => {
  return (
    <Space direction="vertical" style={{ width: '100%', marginBottom: '24px' }}>
      <Input
        placeholder="Search tasks..."
        prefix={<SearchOutlined />}
        value={filter.search}
        onChange={(e) => onFilterChange({ search: e.target.value })}
      />
      
      <Radio.Group
        value={filter.status}
        onChange={(e) => onFilterChange({ status: e.target.value })}
      >
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="active">Active</Radio.Button>
        <Radio.Button value="completed">Completed</Radio.Button>
      </Radio.Group>

      <Select
        style={{ width: '100%' }}
        value={filter.dueDate}
        onChange={(value) => onFilterChange({ dueDate: value })}
      >
        <Select.Option value="all">All Dates</Select.Option>
        <Select.Option value="today">Today</Select.Option>
        <Select.Option value="week">This Week</Select.Option>
        <Select.Option value="overdue">Overdue</Select.Option>
      </Select>

      <Select
        style={{ width: '100%' }}
        value={filter.priority}
        onChange={(value) => onFilterChange({ priority: value })}
      >
        <Select.Option value="all">All Priorities</Select.Option>
        <Select.Option value="high">High</Select.Option>
        <Select.Option value="medium">Medium</Select.Option>
        <Select.Option value="low">Low</Select.Option>
      </Select>
    </Space>
  );
};