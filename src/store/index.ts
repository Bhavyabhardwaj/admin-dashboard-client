import { create } from 'zustand';
import { roles as rolesApi, users as usersApi } from '../lib/api';
import type { Role, User } from '../types';

interface AdminStore {
  users: User[];
  roles: Role[];
  isLoading: boolean;
  error: string | null;
  setUsers: (users: User[]) => void;
  setRoles: (roles: Role[]) => void;
  fetchUsers: () => Promise<void>;
  fetchRoles: () => Promise<void>;
  updateUser: (id: string, data: Partial<User>) => Promise<void>;
  updateRole: (id: string, data: Partial<Role>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  createUser: (data: Partial<User>) => Promise<void>;
  createRole: (data: Partial<Role>) => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  users: [],
  roles: [],
  isLoading: false,
  error: null,

  setUsers: (users) => set({ users }),
  setRoles: (roles) => set({ roles }),

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await usersApi.getAll();
      set({ users, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchRoles: async () => {
    set({ isLoading: true, error: null });
    try {
      const roles = await rolesApi.getAll();
      set({ roles, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateUser: async (id: string, data: Partial<User>) => {
    try {
      const updatedUser = await usersApi.update(id, data);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateRole: async (id: string, data: Partial<Role>) => {
    try {
      const updatedRole = await rolesApi.update(id, data);
      set((state) => ({
        roles: state.roles.map((role) =>
          role.id === id ? { ...role, ...updatedRole } : role
        ),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteUser: async (id: string) => {
    try {
      await usersApi.delete(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteRole: async (id: string) => {
    try {
      await rolesApi.delete(id);
      set((state) => ({
        roles: state.roles.filter((role) => role.id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  createUser: async (data: Partial<User>) => {
    try {
      const newUser = await usersApi.create(data);
      set((state) => ({
        users: [...state.users, newUser],
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  createRole: async (data: Partial<Role>) => {
    try {
      const newRole = await rolesApi.create(data);
      set((state) => ({
        roles: [...state.roles, newRole],
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));