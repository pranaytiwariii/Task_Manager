import React from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import { Task, Priority } from '../types/task';

interface TaskFormProps {
  initialValues?: Partial<Task>;
  onSubmit: (values: Partial<Task>) => void;
  onCancel: () => void;
}

const { TextArea } = Input;

export const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please enter a title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="dueDate"
        label="Due Date"
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="priority"
        label="Priority"
        initialValue="medium"
      >
        <Select>
          <Select.Option value="high">High</Select.Option>
          <Select.Option value="medium">Medium</Select.Option>
          <Select.Option value="low">Low</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {initialValues ? 'Update' : 'Create'} Task
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};