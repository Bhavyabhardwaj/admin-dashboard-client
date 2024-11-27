export type Permission = 'read' | 'write' | 'delete' | 'manage_users' | 'manage_roles';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleId: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roleId: string;
}

export type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
};