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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-all group ${
        item.isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={item.isCompleted}
          onChange={() => onToggle(item.id)}
          className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-0 cursor-pointer transition-all"
        />

        <div className="flex-1 min-w-0">
          <h4 className={`font-medium ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {item.title}
          </h4>
          {item.description && (
            <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">{item.description}</p>
          )}
          {(item.startDate || item.deadlineDate) && (
            <div className="flex gap-3 mt-1.5 text-xs text-gray-500">
              {item.startDate && (
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(item.startDate)}
                </span>
              )}
              {item.deadlineDate && (
                <span className={`inline-flex items-center gap-1 ${
                  isOverdue 
                    ? 'text-red-600 font-semibold' 
                    : isUpcoming 
                    ? 'text-orange-600 font-medium' 
                    : ''
                }`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatDate(item.deadlineDate)}
                  {isOverdue && ' (Overdue)'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this task?')) {
            onDelete(item.id);
          }
        }}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
        title="Delete task"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </motion.div>
  );
};

