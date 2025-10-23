"use client"

import Link from "next/link"
import type { TodoList } from "@/lib/list-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TodoListCardProps {
  list: TodoList
  onDelete: (id: string) => void
  onEdit: (list: TodoList) => void
}

export function TodoListCard({ list, onDelete, onEdit }: TodoListCardProps) {
  return (
    <Card className="bg-secondary hover:border-accent transition-colors">
      <CardHeader>
        <CardTitle className="text-secondary-foreground">{list.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Created {new Date(list.createdAt).toLocaleDateString()}</p>
        <div className="flex gap-2">
          <Link href={`/lists/${list.id}`} className="flex-1">
            <Button variant="default" className="w-full bg-accent text-accent-foreground">
              View
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => onEdit(list)}
            className="text-secondary-foreground border-secondary-foreground"
          >
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(list.id)} className="text-destructive-foreground">
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
