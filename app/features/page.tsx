export default function FeaturesPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-6">
        Features built for daily execution
      </h1>
      <p className="text-muted-foreground max-w-3xl mb-16">
        Every feature exists to answer one question: “What do I need to do
        today?”—without checking yesterday or planning tomorrow.
      </p>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Repeatable tasks</h2>
          <p className="text-muted-foreground max-w-3xl">
            Create tasks that follow time rules instead of dates. Daily
            routines, weekly habits, or specific-day actions automatically
            appear when needed. Once set, they never need to be recreated.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            One-time tasks that disappear
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            Some tasks matter only once. Finish them, and they’re gone
            forever—no clutter, no history to manage.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Clean daily list</h2>
          <p className="text-muted-foreground max-w-3xl">
            Your day is a single, clean list combining routines and unique work.
            No overdue anxiety. No future noise.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Works alongside your tools
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            This app doesn’t replace Notion, Jira, or Trello. It sits above
            them, guiding daily execution while your tools handle details.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Start without login</h2>
          <p className="text-muted-foreground max-w-3xl">
            Begin instantly. Use login only when you want sync and backup. No
            forced accounts, no friction.
          </p>
        </div>
      </div>
    </section>
  );
}
