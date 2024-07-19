import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoItems from '../components/TodoItems';

describe('TodoItems component', () => {
    test('renders with initial state and handles user actions correctly', () => {
        const mockGetItems = jest.fn();
        const mockHandleMarkAsComplete = jest.fn();
        const items = [
            { id: 1, description: 'Test item 1' },
            { id: 2, description: 'Test item 2' },
        ];

        const { getByText, getByRole, getAllByRole } = render(
            <TodoItems
                items={items}
                getItems={mockGetItems}
                handleMarkAsComplete={mockHandleMarkAsComplete}
            />
        );

        expect(getByText('Showing 2 Item(s)')).toBeInTheDocument();

        const refreshButton = getByRole('button', { name: /refresh/i });
        expect(refreshButton).toBeInTheDocument();
        fireEvent.click(refreshButton);
        expect(mockGetItems).toHaveBeenCalledTimes(1);

        items.forEach((item, index) => {
            expect(getByText(item.description)).toBeInTheDocument();
            const markAsCompleteButtons = getAllByRole('button', { name: /mark as completed/i });
            expect(markAsCompleteButtons[index]).toBeInTheDocument();
            fireEvent.click(markAsCompleteButtons[index]);
            expect(mockHandleMarkAsComplete).toHaveBeenCalledWith(item);
        });
    });
});
