/**
 * ListDetail Page
 * Displays all items in a specific list with create functionality
 */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { ToDoItemRow } from '../components/ToDoItemRow';
import { CreateItemModal } from '../components/CreateItemModal';
import { useToDoItems } from '../hooks/useToDoItems';
import { CreateItemRequest } from '../types';
import { motion } from 'framer-motion';

export const ListDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const {
    items,
    isLoading,
    createItem,
    toggleItem,
    deleteItem,
  } = useToDoItems(id!);

  const handleCreate = async (data: CreateItemRequest) => {
    await createItem(data);
  };

  const handleToggle = async (itemId: string) => {
    await toggleItem(itemId);
  };

  const handleDelete = async (itemId: string) => {
    await deleteItem(itemId);
  };

  const completedCount = items.filter(item => item.isCompleted).length;
  const totalCount = items.length;

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    await createItem({
      title: newTaskTitle.trim(),
      description: null,
      startDate: null,
      deadlineDate: null,
    });
    setNewTaskTitle('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <div className="mb-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to lists
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tasks</h2>
          <p className="text-sm text-gray-600">
            {completedCount} of {totalCount} completed
          </p>
        </div>

        {/* Frictionless Add Task Bar */}
        <form onSubmit={handleQuickAdd} className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a task and press Enter..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white"
            />
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              title="Add task with details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </form>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 mt-3">Loading tasks...</p>
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl border border-gray-200"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">All clear!</h3>
            <p className="text-sm text-gray-600">Add your first task to get started</p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {items.filter(item => !item.isCompleted).map((item) => (
              <ToDoItemRow
                key={item.id}
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
            
            {items.some(item => item.isCompleted) && (
              <>
                <div className="pt-6 pb-2">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Completed</h4>
                </div>
                {items.filter(item => item.isCompleted).map((item) => (
                  <ToDoItemRow
                    key={item.id}
                    item={item}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </main>

      <CreateItemModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};

