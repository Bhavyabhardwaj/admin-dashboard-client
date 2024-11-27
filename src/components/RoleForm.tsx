import React from 'react';
import { motion } from 'framer-motion';
import type { Permission, Role } from '../types';
import { cn } from '../lib/utils';
import { Shield, Check } from 'lucide-react';

interface RoleFormProps {
  role: Role;
  onSubmit: (data: Partial<Role>) => void;
}

const availablePermissions: Permission[] = [
  'read',
  'write',
  'delete',
  'manage_users',
  'manage_roles',
];

const permissionColors: Record<Permission, { bg: string; text: string }> = {
  read: { bg: 'bg-green-100', text: 'text-green-800' },
  write: { bg: 'bg-blue-100', text: 'text-blue-800' },
  delete: { bg: 'bg-red-100', text: 'text-red-800' },
  manage_users: { bg: 'bg-purple-100', text: 'text-purple-800' },
  manage_roles: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
};

export function RoleForm({ role, onSubmit }: RoleFormProps) {
  const [selectedPermissions, setSelectedPermissions] = React.useState<Permission[]>(
    role.permissions
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      permissions: selectedPermissions,
    });
  };

  const togglePermission = (permission: Permission) => {
    setSelectedPermissions((current) =>
      current.includes(permission)
        ? current.filter((p) => p !== permission)
        : [...current, permission]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Role Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={role.name}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            defaultValue={role.description}
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Permissions
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availablePermissions.map((permission, index) => (
              <motion.button
                key={permission}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => togglePermission(permission)}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all',
                  selectedPermissions.includes(permission)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                )}
              >
                <div className="flex items-center space-x-3">
                  <Shield className={cn(
                    'h-5 w-5',
                    selectedPermissions.includes(permission)
                      ? 'text-indigo-500'
                      : 'text-gray-400'
                  )} />
                  <span className="font-medium">{permission}</span>
                </div>
                {selectedPermissions.includes(permission) && (
                  <Check className="h-5 w-5 text-indigo-500" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex justify-center rounded-lg border border-transparent px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
        >
          Save Changes
        </motion.button>
      </div>
    </form>
  );
}