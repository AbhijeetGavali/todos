import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Hero */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          A daily task app that removes
          <span className="block">thinking from your routines</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Designed for developers, creators, and anyone with repeatable daily
          work. See only today’s tasks, let routines repeat automatically, and
          start working without planning.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/todo"
            className="px-8 py-4 rounded-xl bg-black text-white text-lg"
          >
            Start free
          </Link>
          <Link
            href="/features"
            className="px-8 py-4 rounded-xl border text-lg"
          >
            Explore features
          </Link>
        </div>
      </div>

      {/* Problem */}
      <div className="mt-28 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          The real problem with daily task management
        </h2>
        <p className="text-muted-foreground mb-4">
          Most to-do apps are great at planning but terrible at execution. Every
          morning starts with mental overhead: checking yesterday, recreating
          recurring tasks, deciding priorities, and figuring out what actually
          matters today.
        </p>
        <p className="text-muted-foreground">
          When your work includes routines—posting content, cooking, workouts,
          Jira tickets, reviews—that thinking cost adds up. Productivity drops
          before work even starts.
        </p>
      </div>

      {/* Solution */}
      <div className="mt-20 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="border rounded-2xl p-6">
          <h3 className="font-semibold mb-2">Today-only focus</h3>
          <p className="text-sm text-muted-foreground">
            No backlog, no future clutter. You see exactly what needs to be done
            today.
          </p>
        </div>
        <div className="border rounded-2xl p-6">
          <h3 className="font-semibold mb-2">
            Repeatable tasks that think for you
          </h3>
          <p className="text-sm text-muted-foreground">
            Daily, weekly, or custom routines appear automatically—without
            re-adding them.
          </p>
        </div>
        <div className="border rounded-2xl p-6">
          <h3 className="font-semibold mb-2">Execution over planning</h3>
          <p className="text-sm text-muted-foreground">
            This is not a project manager. It’s a daily execution guide.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-28 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Open the app. Start working.
        </h2>
        <p className="text-muted-foreground mb-6">
          No setup, no learning curve, no login required to begin.
        </p>
        <Link href="/todo" className="px-8 py-4 rounded-xl bg-black text-white">
          Try it now
        </Link>
      </div>
    </section>
  );
}
