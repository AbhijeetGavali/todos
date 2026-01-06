"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Todo } from "@/app/page"

interface EditTodoDialogProps {
  todo: Todo
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (updates: Partial<Todo>) => void
}

export function EditTodoDialog({ todo, open, onOpenChange, onSave }: EditTodoDialogProps) {
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description || "")
  const [type, setType] = useState<"daily" | "weekly">(todo.type)

  useEffect(() => {
    setTitle(todo.title)
    setDescription(todo.description || "")
    setType(todo.type)
  }, [todo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      type,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>Make changes to your todo item.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description (optional)</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label>Frequency</Label>
              <RadioGroup value={type} onValueChange={(value) => setType(value as "daily" | "weekly")}>
                <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-accent/50">
                  <RadioGroupItem value="daily" id="edit-daily" />
                  <Label htmlFor="edit-daily" className="flex-1 cursor-pointer font-normal">
                    Daily - Resets every day
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-accent/50">
                  <RadioGroupItem value="weekly" id="edit-weekly" />
                  <Label htmlFor="edit-weekly" className="flex-1 cursor-pointer font-normal">
                    Weekly - Resets every Monday
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
