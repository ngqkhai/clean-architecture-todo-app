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
      className={`flex items-center gap-4 p-5 border-2 transition-all ${
        item.isCompleted
          ? 'bg-gray-50 border-gray-300'
          : isOverdue
          ? 'bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
          : isUpcoming
          ? 'bg-white border-gray-400'
          : 'bg-white border-black'
      }`}
    >
      <input
        type="checkbox"
        checked={item.isCompleted}
        onChange={() => onToggle(item.id)}
        className="w-5 h-5 border-2 border-black text-black focus:ring-0 cursor-pointer"
      />

      <div className="flex-1 min-w-0">
        <h4 className={`font-semibold tracking-tight ${item.isCompleted ? 'line-through text-gray-400' : 'text-black'}`}>
          {item.title}
        </h4>
        {item.description && (
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        )}
        {(item.startDate || item.deadlineDate) && (
          <div className="flex gap-4 mt-2 text-xs text-gray-500 uppercase tracking-wide">
            {item.startDate && <span>Start: {formatDate(item.startDate)}</span>}
            {item.deadlineDate && (
              <span className={isOverdue ? 'text-black font-bold' : ''}>
                Due: {formatDate(item.deadlineDate)}
                {isOverdue && ' (!)'}
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
        className="px-4 py-2 text-xs text-white bg-black hover:bg-gray-900 uppercase tracking-wide font-semibold transition"
      >
        Delete
      </button>
    </motion.div>
  );
};

