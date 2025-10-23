"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { listService, type TodoList } from "@/lib/list-service"
import { TodoListCard } from "@/components/todo-list-card"
import { CreateListModal } from "@/components/create-list-modal"
import { Button } from "@/components/ui/button"

export default function ListsOverviewPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [lists, setLists] = useState<TodoList[]>([])
  const [isLoadingLists, setIsLoadingLists] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingList, setEditingList] = useState<TodoList | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchLists()
    }
  }, [isAuthenticated])

  const fetchLists = async () => {
    try {
      setIsLoadingLists(true)
      const data = await listService.getAllLists()
      setLists(data)
    } catch (err: any) {
      setError("Failed to load lists")
      console.error(err)
    } finally {
      setIsLoadingLists(false)
    }
  }

  const handleCreateList = async (title: string) => {
    try {
      if (editingList) {
        const updated = await listService.updateList(editingList.id, title)
        setLists(lists.map((l) => (l.id === updated.id ? updated : l)))
        setEditingList(null)
      } else {
        const newList = await listService.createList(title)
        setLists([...lists, newList])
      }
    } catch (err: any) {
      throw err
    }
  }

  const handleDeleteList = async (id: string) => {
    if (confirm("Are you sure you want to delete this list?")) {
      try {
        await listService.deleteList(id)
        setLists(lists.filter((l) => l.id !== id))
      } catch (err: any) {
        setError("Failed to delete list")
        console.error(err)
      }
    }
  }

  const handleEditList = (list: TodoList) => {
    setEditingList(list)
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
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">My To-Do Lists</h1>
        <Button
          onClick={() => {
            setEditingList(null)
            setIsModalOpen(true)
          }}
          className="bg-accent text-accent-foreground"
        >
          Create New List
        </Button>
      </div>

      {error && <div className="text-destructive mb-4">{error}</div>}

      {isLoadingLists ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading lists...</p>
        </div>
      ) : lists.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No lists yet. Create one to get started!</p>
          <Button
            onClick={() => {
              setEditingList(null)
              setIsModalOpen(true)
            }}
            className="bg-accent text-accent-foreground"
          >
            Create Your First List
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lists.map((list) => (
            <TodoListCard key={list.id} list={list} onDelete={handleDeleteList} onEdit={handleEditList} />
          ))}
        </div>
      )}

      <CreateListModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingList(null)
        }}
        onSubmit={handleCreateList}
        editingList={editingList}
      />
    </main>
  )
}
