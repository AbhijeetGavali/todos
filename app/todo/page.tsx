"use client";

import { useState, useEffect } from "react";
import { TodoList } from "@/components/todo-list";
import { AddTodoDialog } from "@/components/add-todo-dialog";
import { Analytics } from "@/components/analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  type: "daily" | "weekly";
  createdAt: string;
  completedDates: string[]; // Array of dates when todo was completed
}

export interface DayCompletion {
  date: string;
  completed: string[];
  incomplete: string[];
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [history, setHistory] = useState<DayCompletion[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedHistory = localStorage.getItem("completionHistory");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }

    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }

    // Check and reset daily/weekly todos
    checkAndResetTodos();
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("completionHistory", JSON.stringify(history));
    }
  }, [history]);

  // Check if todos need to be reset (daily/weekly)
  const checkAndResetTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    const lastResetDate = localStorage.getItem("lastResetDate");
    const today = new Date().toISOString().split("T")[0];

    if (!storedTodos) return;

    const parsedTodos: Todo[] = JSON.parse(storedTodos);

    if (lastResetDate !== today) {
      // Save today's completion status before reset
      saveCompletionHistory(parsedTodos, today);

      // Reset daily todos
      const resetTodos = parsedTodos.map((todo) => {
        if (todo.type === "daily") {
          return { ...todo, completed: false };
        }

        // Check if it's a new week (Monday) for weekly todos
        const currentDay = new Date().getDay();
        if (todo.type === "weekly" && currentDay === 1) {
          return { ...todo, completed: false };
        }

        return todo;
      });

      setTodos(resetTodos);
      localStorage.setItem("todos", JSON.stringify(resetTodos));
      localStorage.setItem("lastResetDate", today);
    }
  };

  const saveCompletionHistory = (currentTodos: Todo[], date: string) => {
    const completed = currentTodos
      .filter((t) => t.completed)
      .map((t) => t.title);
    const incomplete = currentTodos
      .filter((t) => !t.completed)
      .map((t) => t.title);

    const storedHistory = localStorage.getItem("completionHistory");
    const existingHistory: DayCompletion[] = storedHistory
      ? JSON.parse(storedHistory)
      : [];

    // Check if entry for this date already exists
    const existingEntryIndex = existingHistory.findIndex(
      (h) => h.date === date,
    );

    if (existingEntryIndex !== -1) {
      existingHistory[existingEntryIndex] = { date, completed, incomplete };
    } else {
      existingHistory.push({ date, completed, incomplete });
    }

    // Keep only last 30 days
    const last30Days = existingHistory.slice(-30);
    localStorage.setItem("completionHistory", JSON.stringify(last30Days));
    setHistory(last30Days);
  };

  const addTodo = (
    todo: Omit<Todo, "id" | "completed" | "createdAt" | "completedDates">,
  ) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    const today = new Date().toISOString().split("T")[0];
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const newCompleted = !todo.completed;
          const completedDates = newCompleted
            ? [...(todo.completedDates || []), today]
            : (todo.completedDates || []).filter((d) => d !== today);

          return { ...todo, completed: newCompleted, completedDates };
        }
        return todo;
      }),
    );
  };

  const editTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const dailyTodos = todos.filter((t) => t.type === "daily");
  const weeklyTodos = todos.filter((t) => t.type === "weekly");

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">
                Daily Focus
              </h1>
              <p className="text-sm text-muted-foreground">
                Track your recurring tasks and build consistency
              </p>
            </div>
          </div>
          <AddTodoDialog onAdd={addTodo} />
        </div>

        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <TodoList
                todos={dailyTodos}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo}
                emptyMessage="No daily todos yet. Add one to get started!"
              />
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <TodoList
                todos={weeklyTodos}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo}
                emptyMessage="No weekly todos yet. Add one to build your routine!"
              />
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics todos={todos} history={history} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
