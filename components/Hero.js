import { profile, pipeline } from "@/data/content";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-16 pb-12 sm:pt-28 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
      <div>
        <p className="text-signal dark:text-signal-dark font-medium mb-4">{profile.title}</p>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">{profile.name}</h1>
        <p className="mt-6 text-lg sm:text-xl text-mute dark:text-mute-dark max-w-xl leading-relaxed">{profile.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="rounded-md bg-signal dark:bg-signal-dark text-white dark:text-paper-dark px-5 py-2.5 font-medium hover:opacity-90 transition-opacity">See my projects</a>
          <a href={`mailto:${profile.email}`} className="rounded-md border border-line dark:border-line-dark px-5 py-2.5 font-medium hover:border-signal dark:hover:border-signal-dark transition-colors">Email me</a>
        </div>
      </div>

      <figure aria-label="How the PDF question-answering project works" className="rounded-lg border border-line dark:border-line-dark p-5 font-mono text-sm">
        <figcaption className="text-mute dark:text-mute-dark mb-4">How my PDF Q&amp;A project answers a question</figcaption>
        <ol className="space-y-3">
          {pipeline.map((s, i) => (
            <li key={s.label} className="stage flex gap-3" style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
              <span className="text-signal dark:text-signal-dark w-14 shrink-0">{s.label}</span>
              <span className="text-mute dark:text-mute-dark">{s.detail}</span>
            </li>
          ))}
        </ol>
      </figure>
    </section>
  );
}
