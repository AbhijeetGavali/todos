"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";
import type { Todo } from "@/app/todo/page";

interface AddTodoDialogProps {
  onAdd: (
    todo: Omit<Todo, "id" | "completed" | "createdAt" | "completedDates">,
  ) => void;
}

export function AddTodoDialog({ onAdd }: AddTodoDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"daily" | "weekly">("daily");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      type,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setType("daily");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
        >
          <Plus className="h-5 w-5" />
          Add Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Todo</DialogTitle>
            <DialogDescription>
              Create a new daily or weekly recurring task to track.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Morning workout"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Add more details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label>Frequency</Label>
              <RadioGroup
                value={type}
                onValueChange={(value) => setType(value as "daily" | "weekly")}
              >
                <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-accent/50">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label
                    htmlFor="daily"
                    className="flex-1 cursor-pointer font-normal"
                  >
                    Daily - Resets every day
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-accent/50">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label
                    htmlFor="weekly"
                    className="flex-1 cursor-pointer font-normal"
                  >
                    Weekly - Resets every Monday
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
            >
              Add Todo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
