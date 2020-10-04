import { renderHook, act } from '@testing-library/react-hooks';
import AxiosMock from 'axios-mock-adapter';

import api from '../../services/api';

import { AuthProvider, useAuth } from '../../hooks/auth';

const mockApi = new AxiosMock(api);

describe('auth hook', () => {
  it('should be able to sign in', async () => {
    const postSessionsReply = {
      user: { email: 'test@test.com' },
      token: 'token',
    };
    mockApi.onPost('sessions').reply(200, postSessionsReply);

    const spySetItem = jest.spyOn(Storage.prototype, 'setItem');

    const hook = renderHook(() => useAuth(), { wrapper: AuthProvider });

    hook.result.current.signIn({
      email: postSessionsReply.user.email,
      password: '123456',
    });

    await hook.waitForNextUpdate();

    expect(hook.result.current.user.email).toEqual(
      postSessionsReply.user.email,
    );

    expect(spySetItem).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(postSessionsReply.user),
    );
    expect(spySetItem).toHaveBeenCalledWith(
      '@GoBarber:token',
      postSessionsReply.token,
    );
  });

  it('should fetch session information from local storage', async () => {
    const spyGetItem = jest.spyOn(Storage.prototype, 'getItem');

    spyGetItem.mockImplementation((key: string) => {
      switch (key) {
        case '@GoBarber:user':
          return JSON.stringify({ email: 'test@test.com' });
        case '@GoBarber:token':
          return 'token';
        default:
          return null;
      }
    });

    const hook = renderHook(() => useAuth(), { wrapper: AuthProvider });

    expect(hook.result.current.user.email).toEqual('test@test.com');
  });

  it('should be able to sign out', () => {
    const spyGetItem = jest.spyOn(Storage.prototype, 'getItem');
    const spyRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');

    spyGetItem.mockImplementation((key: string) => {
      switch (key) {
        case '@GoBarber:user':
          return JSON.stringify({ email: 'test@test.com' });
        case '@GoBarber:token':
          return 'token';
        default:
          return null;
      }
    });

    const hook = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      hook.result.current.signOut();
    });

    expect(spyRemoveItem).toHaveBeenCalledTimes(2);
    expect(hook.result.current.user).toBeUndefined();
  });

  it('should be able to update the user data', () => {
    const spySetItem = jest.spyOn(Storage.prototype, 'setItem');

    const hook = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const user = {
      id: 'id',
      name: 'Test Test',
      avatar_url: '',
      email: 'test@test.com',
    };

    act(() => {
      hook.result.current.updateUser(user);
    });

    expect(spySetItem).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
    expect(hook.result.current.user).toEqual(user);
  });
});
