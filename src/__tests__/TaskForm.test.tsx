import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskForm } from '../components/TaskForm';

describe('TaskForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  it('renders form fields correctly', () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByText(/create task/i));
    expect(await screen.findByText(/please enter a title/i)).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Task' },
    });

    fireEvent.click(screen.getByText(/create task/i));
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Test Task',
    }));
  });
});