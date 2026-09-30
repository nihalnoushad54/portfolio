import Section from "./Section";
import { projects } from "@/data/content";

const rows = [["Problem", "problem"], ["Solution", "solution"], ["My contribution", "contribution"], ["Outcome", "outcome"]];

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="space-y-14">
        {projects.map((p) => (
          <article key={p.name} className="grid gap-6 md:grid-cols-[1fr_2fr] border-t border-line dark:border-line-dark pt-8">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-3 text-sm text-mute dark:text-mute-dark leading-relaxed">{p.stack.join(", ")}</p>
              <a href={p.github} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-signal dark:text-signal-dark hover:underline">View on GitHub</a>
            </div>
            <dl className="space-y-4">
              {rows.map(([label, key]) => (
                <div key={key}>
                  <dt className="text-sm font-medium">{label}</dt>
                  <dd className="text-mute dark:text-mute-dark leading-relaxed">{p[key]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </Section>
  );
}
