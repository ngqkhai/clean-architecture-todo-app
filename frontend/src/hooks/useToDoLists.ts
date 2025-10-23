/**
 * useToDoLists Hook
 * React Query hook for managing to-do lists
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listService } from '../api/listService';
import { CreateListRequest, UpdateListRequest } from '../types';

export const useToDoLists = () => {
  const queryClient = useQueryClient();

  // Fetch all lists
  const listsQuery = useQuery({
    queryKey: ['lists'],
    queryFn: () => listService.getAllLists(),
  });

  // Create list mutation
  const createListMutation = useMutation({
    mutationFn: (data: CreateListRequest) => listService.createList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  // Update list mutation
  const updateListMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateListRequest }) =>
      listService.updateList(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  // Delete list mutation
  const deleteListMutation = useMutation({
    mutationFn: (id: string) => listService.deleteList(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });

  return {
    lists: listsQuery.data || [],
    isLoading: listsQuery.isLoading,
    isError: listsQuery.isError,
    error: listsQuery.error,
    createList: createListMutation.mutateAsync,
    updateList: updateListMutation.mutateAsync,
    deleteList: deleteListMutation.mutateAsync,
    isCreating: createListMutation.isPending,
    isUpdating: updateListMutation.isPending,
    isDeleting: deleteListMutation.isPending,
  };
};

