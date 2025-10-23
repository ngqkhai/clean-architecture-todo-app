/**
 * ToDoListCard Component
 * Displays a single to-do list with title, item count, and actions
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToDoList } from '../types';
import { motion } from 'framer-motion';

interface ToDoListCardProps {
  list: ToDoList;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  itemCount?: number;
}

export const ToDoListCard: React.FC<ToDoListCardProps> = ({
  list,
  onDelete,
  onEdit,
  itemCount = 0,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== list.title) {
      onEdit(list.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(list.title);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        {isEditing ? (
          <div className="mb-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to={`/lists/${list.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition">
                {list.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mt-1">{itemCount} items</p>
          </>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this list?')) {
                onDelete(list.id);
              }
            }}
            className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

