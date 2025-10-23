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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ← Back to Lists
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">List Items</h2>
            <p className="text-sm text-gray-600 mt-1">
              {completedCount} of {totalCount} completed
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm"
          >
            + New Item
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading items...</p>
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items yet</h3>
            <p className="text-gray-600 mb-6">Add your first task to this list!</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition inline-block"
            >
              Create First Item
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
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

