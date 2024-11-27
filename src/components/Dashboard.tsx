import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { useAdminStore } from '../store';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Dashboard() {
  const { users, roles } = useAdminStore();
  const inactiveUsers = users.filter((user) => user.status === 'inactive').length;

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Roles',
      value: roles.length,
      change: '+5%',
      trend: 'up',
      icon: Shield,
      color: 'bg-green-500',
    },
    {
      title: 'Inactive Users',
      value: inactiveUsers,
      change: '-3%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="p-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-gray-900"
      >
        Dashboard Overview
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg p-6 transition-shadow hover:shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-4 rounded-lg text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                <span className="text-sm font-medium">{stat.change}</span>
                {stat.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 ml-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 ml-1" />
                )}
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {users.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center p-4 bg-gray-50 rounded-lg"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">Joined as {user.roleId}</p>
              </div>
              <span className="ml-auto text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}