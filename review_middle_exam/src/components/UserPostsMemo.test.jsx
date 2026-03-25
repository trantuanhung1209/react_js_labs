import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserPostsMemo from './UserPostsMemo';

const mockPosts = [
  { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
  { id: 2, userId: 1, title: 'Post 2', body: 'Body 2' },
  { id: 3, userId: 2, title: 'Post 3', body: 'Body 3' },
];

describe('UserPostsMemo', () => {
  beforeEach(() => global.fetch.mockClear());

  test('renders loading state', () => {
    global.fetch.mockImplementationOnce(() => new Promise(() => {}));
    render(<UserPostsMemo />);
    expect(screen.getByText('Đang tải dữ liệu...')).toBeInTheDocument();
  });

  test('fetches and displays posts', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPosts });
    render(<UserPostsMemo />);
    
    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.getByText('Post 3')).toBeInTheDocument();
    });
  });

  test('handles fetch error', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });
    render(<UserPostsMemo />);
    
    await waitFor(() => {
      expect(screen.getByText(/Lỗi:/)).toBeInTheDocument();
    });
  });

  test('filters by search term', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPosts });
    render(<UserPostsMemo />);

    await waitFor(() => expect(screen.getByText('Post 1')).toBeInTheDocument());

    await userEvent.type(screen.getByPlaceholderText('search title...'), 'Post 3');
    
    await waitFor(() => {
      expect(screen.getByText('Post 3')).toBeInTheDocument();
      expect(screen.queryByText('Post 1')).not.toBeInTheDocument();
    });
  });

  test('filters by user ID', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPosts });
    render(<UserPostsMemo />);

    await waitFor(() => expect(screen.getByText('Post 1')).toBeInTheDocument());

    fireEvent.change(screen.getByDisplayValue('all'), { target: { value: '2' } });
    
    await waitFor(() => {
      expect(screen.getByText('Post 3')).toBeInTheDocument();
      expect(screen.queryByText('Post 1')).not.toBeInTheDocument();
    });
  });

  test('refetches data on button click', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPosts });
    render(<UserPostsMemo />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPosts });
    await userEvent.click(screen.getByRole('button', { name: /fetch/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  });
});
