export default function PrivacyPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-6">
        This product is built on the belief that productivity tools should
        respect your privacy by default.
      </p>

      <h2 className="text-xl font-semibold mb-2">Data ownership</h2>
      <p className="mb-6 text-sm">
        Your tasks and routines belong to you. We do not sell, rent, or trade
        personal data.
      </p>

      <h2 className="text-xl font-semibold mb-2">Authentication</h2>
      <p className="mb-6 text-sm">
        Signing in with Google is optional. If you choose to sign in, we only
        use your account to identify you and sync your data across devices.
      </p>

      <h2 className="text-xl font-semibold mb-2">Analytics</h2>
      <p className="mb-6 text-sm">
        We collect minimal, privacy-friendly analytics to understand feature
        usage and improve the product experience.
      </p>

      <h2 className="text-xl font-semibold mb-2">Updates</h2>
      <p className="text-sm">
        This policy may evolve as the product grows. Any major changes will be
        clearly communicated.
      </p>
    </section>
  );
}
