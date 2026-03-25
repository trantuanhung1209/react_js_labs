import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Test from './Test';
import useFetchUsers from '../hooks/useFetchUsers';

jest.mock('../hooks/useFetchUsers');

const mockUsers = [
  { id: 1, name: 'Alice Smith', username: 'alice', email: 'alice@test.com' },
  { id: 2, name: 'Bob Johnson', username: 'bob', email: 'bob@test.com' },
  { id: 3, name: 'Charlie Brown', username: 'charlie', email: 'charlie@test.com' },
];

describe('Test Component', () => {
  beforeEach(() => {
    useFetchUsers.mockClear();
  });

  test('renders loading state', () => {
    useFetchUsers.mockReturnValue({
      users: [],
      loading: true,
      error: { error: false, message: '' },
    });

    render(<Test />);
    expect(screen.getByText('Dang tai users...')).toBeInTheDocument();
  });

  test('renders users after fetching', () => {
    useFetchUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: { error: false, message: '' },
    });

    render(<Test />);
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Ket qua: 3 / 3 users')).toBeInTheDocument();
  });

  test('handles error', () => {
    useFetchUsers.mockReturnValue({
      users: [],
      loading: false,
      error: { error: true, message: 'Network error' },
    });

    render(<Test />);
    expect(screen.getByText(/Loi: Network error/)).toBeInTheDocument();
  });

  test('filters users by name', async () => {
    useFetchUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: { error: false, message: '' },
    });

    render(<Test />);
    const searchInput = screen.getByPlaceholderText(/Search by/);

    await userEvent.type(searchInput, 'Alice');

    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
      expect(screen.getByText('Ket qua: 1 / 3 users')).toBeInTheDocument();
    });
  });

  test('filters users by email', async () => {
    useFetchUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: { error: false, message: '' },
    });

    render(<Test />);
    const searchInput = screen.getByPlaceholderText(/Search by/);

    await userEvent.type(searchInput, 'bob@');

    await waitFor(() => {
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
      expect(screen.getByText('Ket qua: 1 / 3 users')).toBeInTheDocument();
    });
  });

  test('filters users by username', async () => {
    useFetchUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: { error: false, message: '' },
    });

    render(<Test />);
    const searchInput = screen.getByPlaceholderText(/Search by/);

    await userEvent.type(searchInput, 'charlie');

    await waitFor(() => {
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
      expect(screen.getByText('Ket qua: 1 / 3 users')).toBeInTheDocument();
    });
  });

  test('shows all users when search is cleared', async () => {
    useFetchUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: { error: false, message: '' },
    });

    render(<Test />);
    const searchInput = screen.getByPlaceholderText(/Search by/);

    await userEvent.type(searchInput, 'Alice');
    await waitFor(() => {
      expect(screen.getByText('Ket qua: 1 / 3 users')).toBeInTheDocument();
    });

    await userEvent.clear(searchInput);
    await waitFor(() => {
      expect(screen.getByText('Ket qua: 3 / 3 users')).toBeInTheDocument();
    });
  });

  test('handles no results', async () => {
    useFetchUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: { error: false, message: '' },
    });

    render(<Test />);
    const searchInput = screen.getByPlaceholderText(/Search by/);

    await userEvent.type(searchInput, 'Nonexistent');

    await waitFor(() => {
      expect(screen.getByText('Ket qua: 0 / 3 users')).toBeInTheDocument();
      expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    });
  });

  test('filter is case insensitive', async () => {
    useFetchUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: { error: false, message: '' },
    });

    render(<Test />);
    const searchInput = screen.getByPlaceholderText(/Search by/);

    await userEvent.type(searchInput, 'ALICE');

    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('Ket qua: 1 / 3 users')).toBeInTheDocument();
    });
  });
});
