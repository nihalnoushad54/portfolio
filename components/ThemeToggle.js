"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch (e) {}
  };
  return (
    <button onClick={toggle} aria-label="Toggle dark mode"
      className="rounded-full border border-line dark:border-line-dark px-3 py-1 text-sm text-mute dark:text-mute-dark hover:text-ink dark:hover:text-ink-dark transition-colors">
      {dark ? "Light" : "Dark"}
    </button>
  );
}
