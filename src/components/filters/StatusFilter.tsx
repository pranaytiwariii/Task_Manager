import React from 'react';
import { Radio } from 'antd';
import { TaskStatus } from '../../types/task';

interface StatusFilterProps {
  value: TaskStatus | 'all';
  onChange: (value: TaskStatus | 'all') => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => {
  return (
    <Radio.Group
      value={value}
      onChange={(e) => onChange(e.target.value)}
      buttonStyle="solid"
      style={{ width: '100%', textAlign: 'center' }}
    >
      <Radio.Button value="all">All</Radio.Button>
      <Radio.Button value="active">Active</Radio.Button>
      <Radio.Button value="completed">Completed</Radio.Button>
    </Radio.Group>
  );
};