import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Lock, Settings, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon: Icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <Shield className="h-16 w-16 text-indigo-600" />
            </motion.div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              Secure Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A powerful, secure, and intuitive admin panel for managing your users and roles
              with advanced permission controls.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium text-lg inline-flex items-center space-x-2 hover:bg-indigo-700 transition-colors">
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 -z-10"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 -z-10"
        />
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Users}
            title="User Management"
            description="Efficiently manage users with advanced filtering and bulk actions."
            delay={0.2}
          />
          <FeatureCard
            icon={Lock}
            title="Role-Based Access"
            description="Define and manage roles with granular permission controls."
            delay={0.4}
          />
          <FeatureCard
            icon={Settings}
            title="Custom Permissions"
            description="Create custom permission sets tailored to your needs."
            delay={0.6}
          />
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-indigo-600 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-indigo-500/20 backdrop-blur-lg rounded-lg p-8">
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-indigo-100">Active Users</div>
            </div>
            <div className="bg-indigo-500/20 backdrop-blur-lg rounded-lg p-8">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-indigo-100">Custom Roles</div>
            </div>
            <div className="bg-indigo-500/20 backdrop-blur-lg rounded-lg p-8">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-indigo-100">Uptime</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}