import React from 'react';
import { Radio } from 'antd';

export const StatusFilter = ({ value, onChange }) => {
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