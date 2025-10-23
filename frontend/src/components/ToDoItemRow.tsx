/**
 * ToDoItemRow Component
 * Displays a single to-do item with checkbox, title, dates, and actions
 */

import React from 'react';
import { ToDoItem } from '../types';
import { motion } from 'framer-motion';

interface ToDoItemRowProps {
  item: ToDoItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ToDoItemRow: React.FC<ToDoItemRowProps> = ({ item, onToggle, onDelete }) => {
  const isOverdue = item.deadlineDate && new Date(item.deadlineDate) < new Date() && !item.isCompleted;
  const isUpcoming = item.deadlineDate && 
    new Date(item.deadlineDate) > new Date() && 
    new Date(item.deadlineDate) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) &&
    !item.isCompleted;

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`flex items-center gap-4 p-4 rounded-lg border transition ${
        item.isCompleted
          ? 'bg-gray-50 border-gray-200'
          : isOverdue
          ? 'bg-red-50 border-red-200'
          : isUpcoming
          ? 'bg-yellow-50 border-yellow-200'
          : 'bg-white border-gray-200'
      }`}
    >
      <input
        type="checkbox"
        checked={item.isCompleted}
        onChange={() => onToggle(item.id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />

      <div className="flex-1 min-w-0">
        <h4 className={`font-medium ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {item.title}
        </h4>
        {item.description && (
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        )}
        {(item.startDate || item.deadlineDate) && (
          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            {item.startDate && <span>Start: {formatDate(item.startDate)}</span>}
            {item.deadlineDate && (
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                Due: {formatDate(item.deadlineDate)}
                {isOverdue && ' (Overdue)'}
              </span>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this item?')) {
            onDelete(item.id);
          }
        }}
        className="px-3 py-1 text-sm text-red-600 hover:bg-red-100 rounded transition"
      >
        Delete
      </button>
    </motion.div>
  );
};

