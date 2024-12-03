import React from 'react';
import { Space, Select } from 'antd';
import { TaskFilter } from '../../types/task';
import { SearchInput } from './SearchInput';
import { StatusFilter } from './StatusFilter';

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: Partial<TaskFilter>) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ filter, onFilterChange }) => {
  return (
    <Space direction="vertical" style={{ width: '100%', marginBottom: '24px' }}>
      <SearchInput
        value={filter.search}
        onChange={(value) => onFilterChange({ search: value })}
      />
      
      <StatusFilter
        value={filter.status}
        onChange={(value) => onFilterChange({ status: value })}
      />

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