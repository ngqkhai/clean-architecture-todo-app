/**
 * useToDoItems Hook
 * React Query hook for managing to-do items
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemService } from '../api/itemService';
import { CreateItemRequest, UpdateItemRequest } from '../types';

export const useToDoItems = (listId: string) => {
  const queryClient = useQueryClient();

  // Fetch items for a specific list
  const itemsQuery = useQuery({
    queryKey: ['items', listId],
    queryFn: () => itemService.getItemsByListId(listId),
    enabled: !!listId,
  });

  // Create item mutation
  const createItemMutation = useMutation({
    mutationFn: (data: CreateItemRequest) => itemService.createItem(listId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', listId] });
    },
  });

  // Update item mutation
  const updateItemMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateItemRequest }) =>
      itemService.updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', listId] });
    },
  });

  // Toggle item completion mutation
  const toggleItemMutation = useMutation({
    mutationFn: (id: string) => itemService.toggleItemCompletion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', listId] });
    },
  });

  // Delete item mutation
  const deleteItemMutation = useMutation({
    mutationFn: (id: string) => itemService.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', listId] });
    },
  });

  return {
    items: itemsQuery.data || [],
    isLoading: itemsQuery.isLoading,
    isError: itemsQuery.isError,
    error: itemsQuery.error,
    createItem: createItemMutation.mutateAsync,
    updateItem: updateItemMutation.mutateAsync,
    toggleItem: toggleItemMutation.mutateAsync,
    deleteItem: deleteItemMutation.mutateAsync,
    isCreating: createItemMutation.isPending,
    isUpdating: updateItemMutation.isPending,
    isToggling: toggleItemMutation.isPending,
    isDeleting: deleteItemMutation.isPending,
  };
};

