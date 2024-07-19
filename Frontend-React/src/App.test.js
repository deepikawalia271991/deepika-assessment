import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { fetchTodo, postTodo, markCompleted } from './api/todoService';
import { toast } from 'react-toastify';

jest.mock('./api/todoService');
jest.mock('react-toastify', () => ({
  ...jest.requireActual('react-toastify'),
  toast: jest.fn(),
}));

describe('Todo List App', () => {
  beforeEach(() => {
    fetchTodo.mockResolvedValue({ status: 200, data: [] });
    postTodo.mockResolvedValue({ status: 201, data: { id: 1, description: 'Test Todo', isCompleted: false } });
    markCompleted.mockResolvedValue({ status: 200, data: { isCompleted: true } });
  });

  test('renders the Todo List App', async () => {
    render(<App />);
    expect(screen.getByText('Todo List App')).toBeInTheDocument();
  });

  test('adds a new todo item', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Enter description...'), { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('Todo added succesfully!');
    });

  });

  test('marks a todo item as completed', async () => {
    fetchTodo.mockResolvedValueOnce({ status: 200, data: [{ id: 1, description: 'Test Todo', isCompleted: false }] });
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /mark as completed/i }));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('Todo completed succesfully!');
    });
  });

  test('handles API errors gracefully', async () => {
    fetchTodo.mockRejectedValueOnce(new Error('Unable to get Todos'));
    render(<App />);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('Unable to get Todos');
    });
  });
});
