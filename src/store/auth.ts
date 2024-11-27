import { create } from 'zustand';
import { auth } from '../lib/api';
import type { AuthState, AuthUser } from '../types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, isAdmin: boolean) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await auth.login(email, password);
      set({ user, isLoading: false });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to login';
      set({ error: message, isLoading: false });
    }
  },

  signup: async (email: string, password: string, name: string, isAdmin: boolean) => {
    set({ isLoading: true, error: null });
    try {
      const user = await auth.signup({ email, password, name, isAdmin });
      set({ user, isLoading: false });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create account';
      set({ error: message, isLoading: false });
    }
  },

  logout: () => {
    auth.logout();
    set({ user: null, error: null });
  },
}));