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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - List Navigation */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">My Lists</h2>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white"
                title="New List"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500 mt-2">Loading...</p>
              </div>
            ) : lists.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 text-center"
              >
                <p className="text-sm text-gray-500 mb-4">No lists yet</p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Create your first list
                </button>
              </motion.div>
            ) : (
              <div className="p-3 space-y-1">
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
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-100 mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a list to get started</h3>
              <p className="text-gray-500">Choose a list from the sidebar or create a new one</p>
            </div>
          </div>
        </main>
      </div>

      <CreateListModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};

