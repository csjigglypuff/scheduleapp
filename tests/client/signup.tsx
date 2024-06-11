import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../../client/src/pages/Signup';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as jest.Mock;

// Mock window.alert
global.alert = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Signup Page', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    (global.alert as jest.Mock).mockClear();
  });

  test('renders signup form', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Username')).not.toBeNull();
    expect(screen.getByPlaceholderText('Password')).not.toBeNull();
    expect(screen.getByPlaceholderText('Confirm Password')).not.toBeNull();
    expect(screen.getByText('Sign Up')).not.toBeNull();
  });

  test('shows error when passwords do not match', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password1' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password2' } });
    fireEvent.click(screen.getByText('Sign Up'));
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Password does not match');
    });
  });

  test('calls submit function on form submission', async () => {
    mockFetch.mockResolvedValue({ ok: true });

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password1' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password1' } });
    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/signup', expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'testuser', password: 'password1' }),
      }));
    });
  });

  test('navigates to calendar on successful signup', async () => {
    mockFetch.mockResolvedValue({ ok: true });
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password1' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password1' } });
    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/calendar');
    });
  });

  test('shows error when signup fails', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Signup failed' }),
    });

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password1' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password1' } });
    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(screen.getByText('Signup failed')).not.toBeNull();
    });
  });
});
