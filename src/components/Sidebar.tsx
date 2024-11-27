import React from 'react';
import { Users, Shield, Home, LogOut, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useAuthStore } from '../store/auth';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user, logout } = useAuthStore();
  
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ...(user?.roleId === 'admin'
      ? [
          { id: 'users', icon: Users, label: 'Users' },
          { id: 'roles', icon: Shield, label: 'Roles' },
        ]
      : []),
  ];

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-64 bg-gray-900 min-h-screen p-4 flex flex-col"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-2 mb-8 px-4"
      >
        <Shield className="h-8 w-8 text-indigo-500" />
        <span className="text-white text-xl font-bold">Admin Panel</span>
      </motion.div>
      
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            onClick={() => onTabChange(item.id)}
            className={cn(
              'w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200',
              activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-4 border-t border-gray-700"
      >
        <div className="px-4 py-3">
          <div className="text-sm font-medium text-white">{user?.name}</div>
          <div className="text-sm text-gray-400">{user?.email}</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign out</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}