import Section from "./Section";
import { profile, education, certifications } from "@/data/content";

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-mute dark:text-mute-dark">
          {profile.about.map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold">Education</h3>
            <p className="mt-2">{education.degree}</p>
            <p className="text-mute dark:text-mute-dark">{education.school}</p>
            <p className="text-sm text-mute dark:text-mute-dark">{education.period}, {education.detail}</p>
          </div>
          <div>
            <h3 className="font-semibold">Certifications and training</h3>
            <ul className="mt-2 space-y-1 text-mute dark:text-mute-dark">
              {certifications.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
