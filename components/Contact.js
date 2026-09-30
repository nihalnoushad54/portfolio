import Section from "./Section";
import { profile } from "@/data/content";

export default function Contact() {
  const item = "text-signal dark:text-signal-dark hover:underline";
  return (
    <Section id="contact" title="Contact">
      <p className="text-lg text-mute dark:text-mute-dark max-w-xl">I'm open to AI/ML engineering roles. The fastest way to reach me is email.</p>
      <ul className="mt-6 space-y-2">
        <li><a className={item} href={`mailto:${profile.email}`}>{profile.email}</a></li>
        <li><a className={item} href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
        <li><a className={item} href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a className={item} href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a></li>
      </ul>
      <p className="mt-10 text-sm text-mute dark:text-mute-dark">{profile.location}</p>
    </Section>
  );
}
