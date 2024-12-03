import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
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