import Section from "./Section";
import { experience } from "@/data/content";

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-12">
        {experience.map((e) => (
          <div key={e.role + e.org} className="grid gap-4 md:grid-cols-[1fr_2fr]">
            <div>
              <h3 className="text-lg font-semibold">{e.role}</h3>
              <p className="text-mute dark:text-mute-dark">{e.org}</p>
              <p className="text-sm text-mute dark:text-mute-dark">{e.period}</p>
            </div>
            <ul className="space-y-3 list-disc pl-5 marker:text-signal dark:marker:text-signal-dark">
              {e.points.map((p) => <li key={p} className="leading-relaxed">{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
