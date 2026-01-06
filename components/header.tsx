import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        <a href="/" data-testid="home-link">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold" data-testid="text-brand">
              DailyGuide
            </span>
          </div>
        </a>
        <div className="flex gap-4">
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>
    </header>
  );
}
