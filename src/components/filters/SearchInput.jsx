import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const SearchInput = ({ value, onChange }) => {
  return (
    <Input
      placeholder="Search tasks..."
      prefix={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear
    />
  );
};