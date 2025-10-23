"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TodoList } from "@/lib/list-service"

interface CreateListModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string) => Promise<void>
  editingList?: TodoList | null
}

export function CreateListModal({ isOpen, onClose, onSubmit, editingList }: CreateListModalProps) {
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (editingList) {
      setTitle(editingList.title)
    } else {
      setTitle("")
    }
  }, [editingList, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("List title is required")
      return
    }

    setIsLoading(true)
    try {
      await onSubmit(title)
      setTitle("")
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save list")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{editingList ? "Edit List" : "Create New List"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-destructive text-sm">{error}</div>}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                List Title
              </label>
              <Input
                id="title"
                placeholder="Enter list title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
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
