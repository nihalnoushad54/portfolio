export default function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-16 sm:py-24 scroll-mt-14">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-10">{title}</h2>
      {children}
    </section>
  );
}
