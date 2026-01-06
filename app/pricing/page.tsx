export default function PricingPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Pricing</h1>
      <p className="text-muted-foreground mb-12">
        Simple, predictable, and respectful of your focus.
      </p>

      <div className="border rounded-2xl p-10 max-w-sm mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Early Access</h2>
        <p className="text-4xl font-bold mb-4">₹0</p>
        <p className="text-sm text-muted-foreground mb-6">
          Free while the product is in active development.
        </p>
        <ul className="text-sm text-left space-y-2 mb-6">
          <li>• Unlimited repeatable tasks</li>
          <li>• One‑time daily tasks</li>
          <li>• Local-first usage</li>
          <li>• Optional Google login</li>
        </ul>
      </div>
    </section>
  );
}
