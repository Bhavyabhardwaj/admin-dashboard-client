import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { UserTable } from './components/UserTable';
import { RoleTable } from './components/RoleTable';
import { HomePage } from './components/HomePage';
import { useAdminStore } from './store';
import { useAuthStore } from './store/auth';
import { AuthLayout } from './components/AuthLayout';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import type { User, Role } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuthStore();
  const { 
    users, 
    roles, 
    fetchUsers, 
    fetchRoles, 
    updateUser, 
    deleteUser, 
    updateRole, 
    deleteRole 
  } = useAdminStore();

  useEffect(() => {
    if (user?.roleId === 'admin') {
      fetchUsers();
      fetchRoles();
    }
  }, [user, fetchUsers, fetchRoles]);

  const handleEditUser = (user: User) => {
    updateUser(user.id, user);
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  const handleEditRole = (role: Role) => {
    updateRole(role.id, role);
  };

  const handleDeleteRole = (id: string) => {
    deleteRole(id);
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AuthLayout
          title={isLogin ? 'Sign in to your account' : 'Create a new account'}
          subtitle={isLogin ? 'Enter your credentials to access the dashboard' : 'Register to get started'}
        >
          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <SignupForm onToggleForm={() => setIsLogin(true)} />
          )}
        </AuthLayout>
      </motion.div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'home' && <HomePage />}
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'users' && user.roleId === 'admin' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">User Management</h2>
                  <UserTable
                    users={users}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                  />
                </div>
              )}
              {activeTab === 'roles' && user.roleId === 'admin' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Role Management</h2>
                  <RoleTable
                    roles={roles}
                    onEdit={handleEditRole}
                    onDelete={handleDeleteRole}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;