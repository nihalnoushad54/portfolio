import Section from "./Section";
import { skills } from "@/data/content";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skills.map((s) => (
          <div key={s.group}>
            <h3 className="font-semibold mb-3">{s.group}</h3>
            <ul className="flex flex-wrap gap-2">
              {s.items.map((i) => (
                <li key={i} className="rounded-full border border-line dark:border-line-dark px-3 py-1 text-sm text-mute dark:text-mute-dark hover:text-ink dark:hover:text-ink-dark hover:border-signal dark:hover:border-signal-dark transition-colors">{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
