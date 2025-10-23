/**
 * CreateItemModal Component
 * Modal dialog for creating a new to-do item with dates
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreateItemRequest } from '../types';

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateItemRequest) => Promise<void>;
}

export const CreateItemModal: React.FC<CreateItemModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreate({
        title: title.trim(),
        description: description.trim() || null,
        startDate: startDate || null,
        deadlineDate: deadlineDate || null,
      });
      setTitle('');
      setDescription('');
      setStartDate('');
      setDeadlineDate('');
      onClose();
    } catch (error) {
      console.error('Failed to create item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Item</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="item-title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    id="item-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Complete project proposal"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    autoFocus
                    maxLength={200}
                  />
                </div>

                <div>
                  <label htmlFor="item-description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="item-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional description..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    maxLength={1000}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="deadline-date" className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline
                    </label>
                    <input
                      id="deadline-date"
                      type="date"
                      value={deadlineDate}
                      onChange={(e) => setDeadlineDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!title.trim() || isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

