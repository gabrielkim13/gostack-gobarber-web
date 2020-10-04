import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';

import api from '../../services/api';

import SignUp from '../../pages/SignUp';

const mockHistoryPush = jest.fn();
const mockAddToast = jest.fn();

const mockApi = new AxiosMock(api);

jest.mock('react-router-dom', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('../../hooks/toast', () => ({
  useToast: () => ({
    addToast: mockAddToast,
  }),
}));

describe('SignUp Page', () => {
  beforeEach(() => {
    mockHistoryPush.mockClear();
    mockAddToast.mockClear();
  });

  it('should be able to sign up a new user', async () => {
    mockApi.onPost('users').reply(201);

    const screen = render(<SignUp />);

    const nameField = screen.getByPlaceholderText('Nome');
    const emailField = screen.getByPlaceholderText('E-mail');
    const passwordField = screen.getByPlaceholderText('Senha');
    const buttonElement = screen.getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'Test Test' } });
    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement, {});

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should not be able to sign up a user with invalid credentials', async () => {
    const screen = render(<SignUp />);

    const nameField = screen.getByPlaceholderText('Nome');
    const emailField = screen.getByPlaceholderText('E-mail');
    const passwordField = screen.getByPlaceholderText('Senha');
    const buttonElement = screen.getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'Test Test' } });
    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement, {});

    await waitFor(() => {
      expect(mockHistoryPush).not.toHaveBeenCalled();
      expect(mockAddToast).not.toHaveBeenCalled();
    });
  });

  it('should display a toast message if there was a server-side error', async () => {
    mockApi.onPost('users').reply(400, new Error());

    const screen = render(<SignUp />);

    const nameField = screen.getByPlaceholderText('Nome');
    const emailField = screen.getByPlaceholderText('E-mail');
    const passwordField = screen.getByPlaceholderText('Senha');
    const buttonElement = screen.getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'Test Test' } });
    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement, {});

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
