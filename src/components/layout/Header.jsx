import React from 'react';
import { Layout, Button, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

export const Header = ({
  selectedCount,
  onAddTask,
  onBatchDelete,
}) => {
  return (
    <AntHeader style={{ padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1 style={{ color: 'white', margin: 0 }}>Task Dashboard</h1>
      <Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddTask}
        >
          Add Task
        </Button>
        {selectedCount > 0 && (
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={onBatchDelete}
          >
            Delete Selected ({selectedCount})
          </Button>
        )}
      </Space>
    </AntHeader>
  );
};