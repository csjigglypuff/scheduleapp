import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../client/src/pages/Login';

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as jest.Mock;

global.alert = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Login Page', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    (global.alert as jest.Mock).mockClear();
  });

  test('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Username')).not.toBeNull();
    expect(screen.getByPlaceholderText('Password')).not.toBeNull();
    expect(screen.getByText('Log In')).not.toBeNull();
    expect(screen.getByText('Sign Up')).not.toBeNull();
  });

  test('shows error when login fails', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Login failed' }),
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(screen.getByText('Login failed')).not.toBeNull();
    });
  });

  test('calls submit function on form submission', async () => {
    mockFetch.mockResolvedValue({ ok: true });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'pigglyjuff' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });
    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/login', expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'pigglyjuff', password: 'test123' }),
      }));
    });
  });

  test('navigates to calendar on successful login', async () => {
    mockFetch.mockResolvedValue({ ok: true });
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'pigglyjuff' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test123' } });
    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/calendar');
    });
  });

  test('navigates to signup page on sign up button click', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Sign Up'));

    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });
});
