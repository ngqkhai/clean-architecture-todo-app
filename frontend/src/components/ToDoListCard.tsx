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
      className="bg-white border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
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
              className="w-full px-3 py-3 border-2 border-black bg-white focus:bg-gray-50 outline-none"
              autoFocus
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleSave}
                className="flex-1 px-3 py-2 text-xs bg-black text-white hover:bg-gray-900 uppercase tracking-wide font-semibold"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-3 py-2 text-xs bg-white text-black border-2 border-black hover:bg-gray-50 uppercase tracking-wide font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to={`/lists/${list.id}`}>
              <h3 className="text-xl font-bold text-black hover:underline underline-offset-4 transition tracking-tight">
                {list.title}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">{itemCount} items</p>
          </>
        )}

        <div className="flex gap-2 mt-6 pt-4 border-t-2 border-gray-100">
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 px-3 py-2 text-xs font-semibold text-black bg-white border-2 border-black hover:bg-black hover:text-white uppercase tracking-wide transition"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this list?')) {
                onDelete(list.id);
              }
            }}
            className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-black hover:bg-gray-900 uppercase tracking-wide transition"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

