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
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full p-8">
              <h2 className="text-3xl font-bold text-black mb-2 tracking-tight">New Item</h2>
              <div className="w-12 h-0.5 bg-black mb-6"></div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="item-title" className="block text-xs font-semibold text-black mb-2 uppercase tracking-wider">
                    Title *
                  </label>
                  <input
                    id="item-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Complete project proposal"
                    className="w-full px-4 py-3 border-2 border-black bg-white focus:bg-gray-50 outline-none transition-all text-black"
                    autoFocus
                    maxLength={200}
                  />
                </div>

                <div>
                  <label htmlFor="item-description" className="block text-xs font-semibold text-black mb-2 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    id="item-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional description..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-black bg-white focus:bg-gray-50 outline-none resize-none transition-all text-black"
                    maxLength={1000}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start-date" className="block text-xs font-semibold text-black mb-2 uppercase tracking-wider">
                      Start Date
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black bg-white focus:bg-gray-50 outline-none transition-all text-black"
                    />
                  </div>

                  <div>
                    <label htmlFor="deadline-date" className="block text-xs font-semibold text-black mb-2 uppercase tracking-wider">
                      Deadline
                    </label>
                    <input
                      id="deadline-date"
                      type="date"
                      value={deadlineDate}
                      onChange={(e) => setDeadlineDate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black bg-white focus:bg-gray-50 outline-none transition-all text-black"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t-2 border-gray-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 text-xs text-black bg-white border-2 border-black hover:bg-gray-50 font-semibold uppercase tracking-wide transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!title.trim() || isSubmitting}
                    className="flex-1 px-4 py-3 text-xs bg-black hover:bg-gray-900 text-white font-semibold uppercase tracking-wide transition disabled:opacity-50 disabled:cursor-not-allowed"
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

