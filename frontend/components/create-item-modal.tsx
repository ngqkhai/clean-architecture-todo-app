"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TodoItem } from "@/lib/item-service"

interface CreateItemModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (itemData: {
    title: string
    description?: string
    startDate?: string
    deadlineDate?: string
  }) => Promise<void>
  editingItem?: TodoItem | null
}

export function CreateItemModal({ isOpen, onClose, onSubmit, editingItem }: CreateItemModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [deadlineDate, setDeadlineDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title)
      setDescription(editingItem.description || "")
      setStartDate(editingItem.startDate ? editingItem.startDate.split("T")[0] : "")
      setDeadlineDate(editingItem.deadlineDate ? editingItem.deadlineDate.split("T")[0] : "")
    } else {
      setTitle("")
      setDescription("")
      setStartDate("")
      setDeadlineDate("")
    }
  }, [editingItem, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("Item title is required")
      return
    }

    setIsLoading(true)
    try {
      await onSubmit({
        title,
        description: description || undefined,
        startDate: startDate || undefined,
        deadlineDate: deadlineDate || undefined,
      })
      setTitle("")
      setDescription("")
      setStartDate("")
      setDeadlineDate("")
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save item")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{editingItem ? "Edit Item" : "Create New Item"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-destructive text-sm">{error}</div>}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                placeholder="Enter item title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="description"
                placeholder="Enter description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label htmlFor="deadlineDate" className="text-sm font-medium">
                Deadline
              </label>
              <Input id="deadlineDate" type="date" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-accent text-accent-foreground" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
