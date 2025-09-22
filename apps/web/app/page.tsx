const featureCards = [
  {
    title: "Spreesy Index™ Insight",
    description:
      "Understand predicted ROI with transparent scoring across purchase intent, audience fit, creator accessibility, and channel performance."
  },
  {
    title: "Cross-channel Coverage",
    description:
      "Discover newsletters, YouTubers, TikTokers, podcasters, and blogs in a single search powered by CreatorDB data."
  },
  {
    title: "Workflow Ready",
    description:
      "Track outreach, unlock contact intel, and sync QA artifacts so every story moves smoothly from draft to done."
  }
] as const;

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16">
      <section className="rounded-3xl bg-dark-surface p-10 ring-1 ring-primary/30">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs uppercase tracking-widest text-primary">
            Creator Growth Platform
          </span>
          <h1 className="text-5xl font-bold leading-tight">
            Stop guessing channels. Start growing revenue.
          </h1>
          <p className="text-lg text-gray-300">
            Spreesy analyzes your products, scans the creator universe, and ranks partnerships by the
            Spreesy Index™ so you can invest in the creators who actually drive sales.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-light">
              Start onboarding
            </button>
            <button className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40">
              View sample matches
            </button>
          </div>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {featureCards.map((feature) => (
          <article key={feature.title} className="space-y-3 rounded-2xl border border-white/5 bg-dark-surface p-6">
            <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
            <p className="text-sm text-gray-300">{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
