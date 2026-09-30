import ThemeToggle from "./ThemeToggle";

const links = [["Projects", "#projects"], ["Experience", "#experience"], ["Skills", "#skills"], ["Contact", "#contact"]];

export default function Nav({ name }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-paper/80 dark:bg-paper-dark/80 border-b border-line dark:border-line-dark">
      <nav className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">{name}</a>
        <div className="flex items-center gap-5 text-sm">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="hidden sm:block text-mute dark:text-mute-dark hover:text-ink dark:hover:text-ink-dark transition-colors">{l}</a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
