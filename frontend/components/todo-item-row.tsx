"use client"

import type { TodoItem } from "@/lib/item-service"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface TodoItemRowProps {
  item: TodoItem
  onToggle: (id: string) => void
  onEdit: (item: TodoItem) => void
  onDelete: (id: string) => void
}

export function TodoItemRow({ item, onToggle, onEdit, onDelete }: TodoItemRowProps) {
  const isOverdue = item.deadlineDate && new Date(item.deadlineDate) < new Date() && !item.isCompleted

  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors">
      <Checkbox checked={item.isCompleted} onCheckedChange={() => onToggle(item.id)} className="h-5 w-5" />
      <div className="flex-1 min-w-0">
        <p className={`font-medium ${item.isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`}>
          {item.title}
        </p>
        {item.description && <p className="text-sm text-muted-foreground truncate">{item.description}</p>}
        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
          {item.startDate && <span>Start: {new Date(item.startDate).toLocaleDateString()}</span>}
          {item.deadlineDate && (
            <span className={isOverdue ? "text-destructive font-semibold" : ""}>
              Due: {new Date(item.deadlineDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(item)}
          className="text-secondary-foreground border-secondary-foreground"
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(item.id)}
          className="text-destructive-foreground"
        >
          Delete
        </Button>
      </div>
    </div>
  )
}
