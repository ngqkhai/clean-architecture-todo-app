/**
 * CreateListModal Component
 * Modal dialog for creating a new to-do list
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => Promise<void>;
}

export const CreateListModal: React.FC<CreateListModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreate(title.trim());
      setTitle('');
      onClose();
    } catch (error) {
      console.error('Failed to create list:', error);
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
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full p-8">
              <h2 className="text-3xl font-bold text-black mb-2 tracking-tight">New List</h2>
              <div className="w-12 h-0.5 bg-black mb-6"></div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="list-title" className="block text-xs font-semibold text-black mb-2 uppercase tracking-wider">
                    List Title
                  </label>
                  <input
                    id="list-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Work Tasks, Shopping..."
                    className="w-full px-4 py-3 border-2 border-black bg-white focus:bg-gray-50 outline-none transition-all text-black"
                    autoFocus
                    maxLength={100}
                  />
                </div>

                <div className="flex gap-3">
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

