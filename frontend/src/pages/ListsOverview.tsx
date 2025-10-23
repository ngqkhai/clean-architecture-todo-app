/**
 * ListsOverview Page
 * Displays all to-do lists for the authenticated user in a grid
 */

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ToDoListCard } from '../components/ToDoListCard';
import { CreateListModal } from '../components/CreateListModal';
import { useToDoLists } from '../hooks/useToDoLists';
import { motion } from 'framer-motion';

export const ListsOverview: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { lists, isLoading, createList, updateList, deleteList } = useToDoLists();

  const handleCreate = async (title: string) => {
    await createList({ title });
  };

  const handleEdit = async (id: string, title: string) => {
    await updateList({ id, data: { title } });
  };

  const handleDelete = async (id: string) => {
    await deleteList(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Lists</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm"
          >
            + New List
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading your lists...</p>
          </div>
        ) : lists.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No lists yet</h3>
            <p className="text-gray-600 mb-6">Create your first to-do list to get started!</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition inline-block"
            >
              Create Your First List
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((list) => (
              <ToDoListCard
                key={list.id}
                list={list}
                onDelete={handleDelete}
                onEdit={handleEdit}
                itemCount={0}
              />
            ))}
          </div>
        )}
      </main>

      <CreateListModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};

