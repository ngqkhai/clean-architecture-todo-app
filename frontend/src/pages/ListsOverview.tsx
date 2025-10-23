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
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-black tracking-tight">Your Lists</h2>
            <div className="w-16 h-0.5 bg-black mt-3"></div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-8 py-3 bg-black hover:bg-gray-900 text-white font-semibold uppercase tracking-wider transition text-sm"
          >
            + New List
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4 uppercase tracking-wide text-sm">Loading...</p>
          </div>
        ) : lists.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border-2 border-black p-16"
          >
            <div className="text-6xl mb-6">—</div>
            <h3 className="text-2xl font-bold text-black mb-3 tracking-tight">No lists yet</h3>
            <p className="text-gray-600 mb-8 uppercase tracking-wide text-sm">Create your first list to begin</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-8 py-3 bg-black hover:bg-gray-900 text-white font-semibold uppercase tracking-wider transition text-sm"
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

