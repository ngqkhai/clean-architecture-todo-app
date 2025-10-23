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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="text-black hover:underline text-sm font-semibold uppercase tracking-wider inline-flex items-center">
            ← Back to Lists
          </Link>
        </div>

        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-black tracking-tight">Items</h2>
            <div className="w-16 h-0.5 bg-black mt-3 mb-2"></div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              {completedCount} of {totalCount} completed
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-8 py-3 bg-black hover:bg-gray-900 text-white font-semibold uppercase tracking-wider transition text-sm"
          >
            + New Item
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4 uppercase tracking-wide text-sm">Loading...</p>
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border-2 border-black p-16"
          >
            <div className="text-6xl mb-6">—</div>
            <h3 className="text-2xl font-bold text-black mb-3 tracking-tight">No items yet</h3>
            <p className="text-gray-600 mb-8 uppercase tracking-wide text-sm">Add your first task</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-8 py-3 bg-black hover:bg-gray-900 text-white font-semibold uppercase tracking-wider transition text-sm"
            >
              Create First Item
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <ToDoItemRow
                key={item.id}
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
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

