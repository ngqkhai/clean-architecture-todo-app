import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ToDoItemRow from '../components/ToDoItemRow';
import CreateItemModal from '../components/CreateItemModal';
import itemService, { type ToDoItem, type ItemData } from '../services/itemService';
import listService, { type ToDoList } from '../services/listService';

const ListDetail: React.FC = () => {
  const { id: listId } = useParams<{ id: string }>();
  const [list, setList] = useState<ToDoList | null>(null);
  const [items, setItems] = useState<ToDoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ToDoItem | null>(null);

  useEffect(() => {
    if (listId) {
      fetchList();
      fetchItems();
    }
  }, [listId]);

  const fetchList = async () => {
    if (!listId) return;
    
    try {
      const allLists = await listService.getAllLists();
      const currentList = allLists.find(l => l.id === listId);
      if (currentList) {
        setList(currentList);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load list');
    }
  };

  const fetchItems = async () => {
    if (!listId) return;
    
    try {
      setIsLoading(true);
      const data = await itemService.getItemsForList(listId);
      setItems(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load items');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateItem = async (itemData: ItemData) => {
    if (!listId) return;
    
    if (editingItem) {
      await itemService.updateItem(editingItem.id, itemData);
    } else {
      await itemService.createItem(listId, itemData);
    }
    await fetchItems();
    setEditingItem(null);
  };

  const handleToggle = async (id: string) => {
    try {
      await itemService.toggleCompletion(id);
      await fetchItems();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to toggle item');
    }
  };

  const handleEdit = (item: ToDoItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    try {
      await itemService.deleteItem(id);
      await fetchItems();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const incompleteItems = items.filter(item => !item.isCompleted);
  const completedItems = items.filter(item => item.isCompleted);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text">
              {list?.title || 'Loading...'}
            </h1>
            <p className="text-text/70 mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'} total • 
              {' '}{incompleteItems.length} pending • 
              {' '}{completedItems.length} completed
            </p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add Item
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-text/60">Loading items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-secondary">
            <p className="text-text/60 mb-4">No items in this list yet</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
            >
              Add Your First Item
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {incompleteItems.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  To Do ({incompleteItems.length})
                </h2>
                <div className="space-y-3">
                  {incompleteItems.map((item) => (
                    <ToDoItemRow
                      key={item.id}
                      item={item}
                      onToggle={handleToggle}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {completedItems.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-text/60 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Completed ({completedItems.length})
                </h2>
                <div className="space-y-3">
                  {completedItems.map((item) => (
                    <ToDoItemRow
                      key={item.id}
                      item={item}
                      onToggle={handleToggle}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <CreateItemModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleCreateItem}
        editingItem={editingItem}
      />
    </div>
  );
};

export default ListDetail;

