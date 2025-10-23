"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { listService, type TodoList } from "@/lib/list-service"
import { itemService, type TodoItem } from "@/lib/item-service"
import { TodoItemRow } from "@/components/todo-item-row"
import { CreateItemModal } from "@/components/create-item-modal"
import { Button } from "@/components/ui/button"

export default function ListDetailPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const listId = params.id as string

  const [list, setList] = useState<TodoList | null>(null)
  const [items, setItems] = useState<TodoItem[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<TodoItem | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated && listId) {
      fetchData()
    }
  }, [isAuthenticated, listId])

  const fetchData = async () => {
    try {
      setIsLoadingData(true)
      const [listData, itemsData] = await Promise.all([
        listService.getAllLists().then((lists) => lists.find((l) => l.id === listId)),
        itemService.getItemsForList(listId),
      ])
      setList(listData || null)
      setItems(itemsData)
    } catch (err: any) {
      setError("Failed to load list")
      console.error(err)
    } finally {
      setIsLoadingData(false)
    }
  }

  const handleCreateItem = async (itemData: {
    title: string
    description?: string
    startDate?: string
    deadline?: string
  }) => {
    try {
      if (editingItem) {
        const updated = await itemService.updateItem(editingItem.id, itemData)
        setItems(items.map((i) => (i.id === updated.id ? updated : i)))
        setEditingItem(null)
      } else {
        const newItem = await itemService.createItem(listId, itemData)
        setItems([...items, newItem])
      }
    } catch (err: any) {
      throw err
    }
  }

  const handleToggleItem = async (id: string) => {
    try {
      const updated = await itemService.toggleCompletion(id)
      setItems(items.map((i) => (i.id === updated.id ? updated : i)))
    } catch (err: any) {
      setError("Failed to update item")
      console.error(err)
    }
  }

  const handleDeleteItem = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await itemService.deleteItem(id)
        setItems(items.filter((i) => i.id !== id))
      } catch (err: any) {
        setError("Failed to delete item")
        console.error(err)
      }
    }
  }

  const handleEditItem = (item: TodoItem) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/lists" className="text-accent hover:underline mb-4 inline-block">
        ← Back to Lists
      </Link>

      {isLoadingData ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading list...</p>
        </div>
      ) : !list ? (
        <div className="text-center py-12">
          <p className="text-destructive">List not found</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">{list.title}</h1>
            <Button
              onClick={() => {
                setEditingItem(null)
                setIsModalOpen(true)
              }}
              className="bg-accent text-accent-foreground"
            >
              Add New Item
            </Button>
          </div>

          {error && <div className="text-destructive mb-4">{error}</div>}

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No items yet. Add one to get started!</p>
              <Button
                onClick={() => {
                  setEditingItem(null)
                  setIsModalOpen(true)
                }}
                className="bg-accent text-accent-foreground"
              >
                Add Your First Item
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <TodoItemRow
                  key={item.id}
                  item={item}
                  onToggle={handleToggleItem}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          )}
        </>
      )}

      <CreateItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingItem(null)
        }}
        onSubmit={handleCreateItem}
        editingItem={editingItem}
      />
    </main>
  )
}
