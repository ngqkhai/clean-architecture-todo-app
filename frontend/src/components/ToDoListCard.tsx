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
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="group"
    >
      {isEditing ? (
        <div className="p-3 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <Link
          to={`/lists/${list.id}`}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {list.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{itemCount} {itemCount === 1 ? 'task' : 'tasks'}</p>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
              className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
              title="Edit list"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm('Are you sure you want to delete this list? All tasks will be deleted.')) {
                  onDelete(list.id);
                }
              }}
              className="p-1.5 rounded hover:bg-red-100 text-gray-600 hover:text-red-600"
              title="Delete list"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </Link>
      )}
    </motion.div>
  );
};

