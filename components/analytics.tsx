"use client";

import type { Todo, DayCompletion } from "@/app/todo/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, Target, Calendar, Award } from "lucide-react";
import { useMemo } from "react";

interface AnalyticsProps {
  todos: Todo[];
  history: DayCompletion[];
}

export function Analytics({ todos, history }: AnalyticsProps) {
  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayCompleted = todos.filter((t) => t.completed).length;
    const todayTotal = todos.length;
    const todayPercentage =
      todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0;

    // Calculate weekly completion rate
    const last7Days = history.slice(-7);
    const weeklyCompleted = last7Days.reduce(
      (sum, day) => sum + day.completed.length,
      0,
    );
    const weeklyTotal = last7Days.reduce(
      (sum, day) => sum + day.completed.length + day.incomplete.length,
      0,
    );
    const weeklyPercentage =
      weeklyTotal > 0 ? Math.round((weeklyCompleted / weeklyTotal) * 100) : 0;

    // Calculate streak
    let currentStreak = 0;
    for (let i = history.length - 1; i >= 0; i--) {
      const day = history[i];
      const completionRate =
        day.completed.length / (day.completed.length + day.incomplete.length);
      if (completionRate >= 0.5) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Best day
    const bestDay = history.reduce((best, day) => {
      const rate =
        day.completed.length / (day.completed.length + day.incomplete.length);
      const bestRate =
        best.completed.length /
        (best.completed.length + best.incomplete.length);
      return rate > bestRate ? day : best;
    }, history[0] || { date: today, completed: [], incomplete: [] });

    return {
      todayPercentage,
      todayCompleted,
      todayTotal,
      weeklyPercentage,
      currentStreak,
      bestDay,
    };
  }, [todos, history]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Progress
            </CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.todayPercentage}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.todayCompleted} of {stats.todayTotal} tasks completed
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-emerald-500/10 to-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Average
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.weeklyPercentage}%
            </div>
            <p className="text-xs text-muted-foreground">
              Last 7 days completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-orange-500/10 to-amber-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Streak
            </CardTitle>
            <Award className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.currentStreak}
            </div>
            <p className="text-xs text-muted-foreground">
              Days with 50%+ completion
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {todos.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active recurring tasks
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Completion History</CardTitle>
          <CardDescription>Last 14 days of task completion</CardDescription>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <p className="text-center text-muted-foreground">
                No history yet. Complete some tasks to see your progress!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history
                .slice(-14)
                .reverse()
                .map((day) => {
                  const total = day.completed.length + day.incomplete.length;
                  const percentage =
                    total > 0
                      ? Math.round((day.completed.length / total) * 100)
                      : 0;
                  const date = new Date(day.date);
                  const formattedDate = date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <div key={day.date} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          {formattedDate}
                        </span>
                        <span className="text-muted-foreground">
                          {day.completed.length}/{total} tasks ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      {day.completed.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Completed: {day.completed.join(", ")}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
