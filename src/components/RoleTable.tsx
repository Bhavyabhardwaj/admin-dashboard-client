import React, { useState } from 'react';
import { Edit2, Trash2, ShieldPlus, Search } from 'lucide-react';
import type { Role } from '../types';
import { Modal } from './Modal';
import { RoleForm } from './RoleForm';
import { ConfirmDialog } from './ConfirmDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id: string) => void;
}

export function RoleTable({ roles, onEdit, onDelete }: RoleTableProps) {
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deletingRoleId, setDeletingRoleId] = useState<string | null>(null);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEditRole = (data: Partial<Role>) => {
    if (editingRole) {
      onEdit({ ...editingRole, ...data });
      setEditingRole(null);
    }
  };

  const handleAddRole = (data: Partial<Role>) => {
    const newRole: Role = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name || '',
      description: data.description || '',
      permissions: data.permissions || [],
    };
    onEdit(newRole);
    setIsAddingRole(false);
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const emptyRole: Role = {
    id: '',
    name: '',
    description: '',
    permissions: [],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingRole(true)}
          className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <ShieldPlus className="h-4 w-4 mr-2" />
          Add New Role
        </motion.button>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredRoles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingRole(role)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setDeletingRoleId(role.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {role.permissions.map((permission) => (
                    <span
                      key={permission}
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        {
                          'bg-green-100 text-green-800': permission === 'read',
                          'bg-blue-100 text-blue-800': permission === 'write',
                          'bg-red-100 text-red-800': permission === 'delete',
                          'bg-purple-100 text-purple-800': permission === 'manage_users',
                          'bg-yellow-100 text-yellow-800': permission === 'manage_roles',
                        }
                      )}
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal
        isOpen={!!editingRole}
        onClose={() => setEditingRole(null)}
        title="Edit Role"
      >
        {editingRole && (
          <RoleForm
            role={editingRole}
            onSubmit={handleEditRole}
          />
        )}
      </Modal>

      <Modal
        isOpen={isAddingRole}
        onClose={() => setIsAddingRole(false)}
        title="Add Role"
      >
        <RoleForm
          role={emptyRole}
          onSubmit={handleAddRole}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingRoleId}
        onClose={() => setDeletingRoleId(null)}
        onConfirm={() => {
          if (deletingRoleId) {
            onDelete(deletingRoleId);
            setDeletingRoleId(null);
          }
        }}
        title="Delete Role"
        message="Are you sure you want to delete this role? This action cannot be undone and may affect users with this role."
      />
    </div>
  );
}