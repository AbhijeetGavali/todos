"use client";

import { useState } from "react";
import type { Todo } from "@/app/todo/page";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EditTodoDialog } from "@/components/edit-todo-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="group flex items-center gap-3 rounded-lg border border-border/50 bg-card p-4 transition-colors hover:border-border hover:bg-accent/50">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="h-5 w-5"
      />

      <div className="flex-1 min-w-0">
        <h4
          className={`text-sm font-medium text-foreground ${
            todo.completed ? "line-through opacity-50" : ""
          }`}
        >
          {todo.title}
        </h4>
        {todo.description && (
          <p
            className={`text-xs text-muted-foreground ${
              todo.completed ? "line-through opacity-50" : ""
            }`}
          >
            {todo.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setEditOpen(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete todo?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                todo.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(todo.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <EditTodoDialog
        todo={todo}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={(updates) => {
          onEdit(todo.id, updates);
          setEditOpen(false);
        }}
      />
    </div>
  );
}
