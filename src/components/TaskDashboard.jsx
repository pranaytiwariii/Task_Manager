import React, { useState } from "react";
import { Layout, Modal, message } from "antd";
import { TaskForm } from "./task/TaskForm";
import { TaskList } from "./task/TaskList";
import { TaskFilters } from "./filters/TaskFilters";
import { Header } from "./layout/Header";
import { useTaskOperations } from "../hooks/useTaskOperations";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { useSelector } from "react-redux";

const { Content, Sider } = Layout;

export const TaskDashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const { createTask, editTask, removeTask, toggleTaskStatus } =
    useTaskOperations();
  const { filter, updateFilter, getFilteredTasks } = useTaskFilters();
  const toggleTaskSelection = (taskId) => {
    setSelectedTasks((prevSelectedTasks) =>
      prevSelectedTasks.includes(taskId)
        ? prevSelectedTasks.filter((id) => id !== taskId)
        : [...prevSelectedTasks, taskId]
    );
  };

  const handleTaskSubmit = (values) => {
    if (editingTask) {
      editTask({ ...editingTask, ...values });
      message.success("Task updated successfully");
    } else {
      createTask(
        values.title,
        values.description,
        values.dueDate,
        values.priority
      );
      message.success("Task created successfully");
    }
    setIsModalVisible(false);
    setEditingTask(null);
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const handleTaskDelete = (taskId) => {
    Modal.confirm({
      title: "Delete Task",
      content: "Are you sure you want to delete this task?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeTask([taskId]);
        message.success("Task deleted successfully");
      },
    });
  };

  const handleBatchDelete = () => {
    if (selectedTasks.length === 0) {
      message.warning("Please select tasks to delete");
      return;
    }

    Modal.confirm({
      title: "Delete Selected Tasks",
      content: `Are you sure you want to delete ${selectedTasks.length} selected tasks?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeTask(selectedTasks);
        message.success("Selected tasks deleted successfully");
      },
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        selectedCount={selectedTasks.length}
        onAddTask={() => setIsModalVisible(true)}
        onBatchDelete={handleBatchDelete}
      />
      <Layout>
        <Sider width={300} theme="light" style={{ padding: "24px" }}>
          <TaskFilters filter={filter} onFilterChange={updateFilter} />
        </Sider>
        <Content style={{ padding: "24px" }}>
          <TaskList
            tasks={getFilteredTasks()}
            selectedTasks={selectedTasks}
            onTaskSelect={toggleTaskSelection}
            onTaskEdit={handleTaskEdit}
            onTaskDelete={handleTaskDelete}
            onTaskStatusToggle={toggleTaskStatus}
          />
        </Content>
      </Layout>

      <Modal
        title={editingTask ? "Edit Task" : "Create Task"}
        open={isModalVisible}
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
