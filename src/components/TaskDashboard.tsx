import React, { useState } from 'react';
import { Layout, message, Modal } from 'antd';
import { Task } from '../types/task';
import { useTaskOperations } from '../hooks/useTaskOperations';
import { useTaskFilters } from '../hooks/useTaskFilters';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';

const { Header, Content, Sider } = Layout;

export const TaskDashboard: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const { createTask, editTask, removeTask, toggleTaskStatus } = useTaskOperations();
  const { getFilteredTasks } = useTaskFilters();

  const toggleTaskSelection = (taskId: string): void => {
    setSelectedTasks((prevSelectedTasks) =>
      prevSelectedTasks.includes(taskId)
        ? prevSelectedTasks.filter((id) => id !== taskId)
        : [...prevSelectedTasks, taskId]
    );
  };

  const handleTaskSubmit = (values: any) => {
    if (editingTask) {
      if (editingTask) {
        if (editingTask) {
          if (editingTask) {
            if (editingTask) {
              editTask({ ...editingTask, ...values });
            }
          }
        }
      }
      message.success('Task updated successfully');
    } else {
      createTask(values);
      message.success('Task created successfully');
    }
    setIsModalVisible(false);
    setEditingTask(null);
  };

  const handleDeleteSelectedTasks = () => {
    Modal.confirm({
      title: 'Delete Selected Tasks',
      content: `Are you sure you want to delete ${selectedTasks.length} selected tasks?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeTask(selectedTasks);
        message.success('Selected tasks deleted successfully');
      },
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        {/* Add your header content here */}
      </Header>
      <Layout>
        <Sider>
          {/* Add your sider content here */}
        </Sider>
        <Content>
          <TaskList
            tasks={getFilteredTasks()}
            selectedTasks={selectedTasks}
            onTaskSelect={toggleTaskSelection}
            onTaskStatusToggle={toggleTaskStatus}
            onTaskEdit={(task) => {
              setEditingTask(task);
              setIsModalVisible(true);
            }}
            onTaskDelete={(taskId) => {
              removeTask([taskId]);
              message.success('Task deleted successfully');
            }}
          />
          <button onClick={() => setIsModalVisible(true)}>Add Task</button>
          <button onClick={handleDeleteSelectedTasks} disabled={selectedTasks.length === 0}>
            Delete Selected Tasks
          </button>
        </Content>
      </Layout>
      <Modal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingTask(null);
        }}
        footer={null}
      >
        <TaskForm
          initialValues={editingTask || undefined}
          onSubmit={handleTaskSubmit}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingTask(null);
          }}
        />
      </Modal>
    </Layout>
  );
};

export default TaskDashboard;