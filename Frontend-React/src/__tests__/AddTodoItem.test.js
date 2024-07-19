import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddTodoItem from '../components/AddTodoItem';

describe('AddTodoItem component', () => {
    test('renders with initial state and handles user actions correctly', () => {
        const mockHandleDescriptionChange = jest.fn();
        const mockHandleAdd = jest.fn();
        const mockHandleClear = jest.fn();

        const { getByRole, getByPlaceholderText } = render(
            <AddTodoItem
                description=""
                handleDescriptionChange={mockHandleDescriptionChange}
                handleAdd={mockHandleAdd}
                handleClear={mockHandleClear}
            />
        );

        expect(getByRole('button', { name: /add item/i })).toBeInTheDocument();

        const inputElement = getByPlaceholderText('Enter description...');
        fireEvent.change(inputElement, { target: { value: 'Test description' } });
        expect(mockHandleDescriptionChange).toHaveBeenCalledTimes(1);

        const addItemButton = getByRole('button', { name: /add item/i });
        fireEvent.click(addItemButton);
        expect(mockHandleAdd).toHaveBeenCalledTimes(1);

        const clearButton = getByRole('button', { name: /clear/i });
        fireEvent.click(clearButton);
        expect(mockHandleClear).toHaveBeenCalledTimes(1);
    });
});
