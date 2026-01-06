"use client"

import type { Todo } from "@/app/page"
import { TodoItem } from "@/components/todo-item"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onEdit: (id: string, updates: Partial<Todo>) => void
  onDelete: (id: string) => void
  emptyMessage: string
}

export function TodoList({ todos, onToggle, onEdit, onDelete, emptyMessage }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center p-8">
        <p className="text-center text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  const completed = todos.filter((t) => t.completed).length
  const total = todos.length

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Tasks</h3>
          <p className="text-sm text-muted-foreground">
            {completed} of {total} completed
          </p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-border bg-background">
          <span className="text-sm font-bold text-foreground">
            {total > 0 ? Math.round((completed / total) * 100) : 0}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}
