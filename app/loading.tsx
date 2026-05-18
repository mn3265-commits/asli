export default function Loading() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-5 py-20 bg-[var(--bg)]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <span className="absolute inset-0 rounded-full bg-[var(--ochre)] opacity-30 animate-ping" />
          <span className="absolute inset-2 rounded-full bg-[var(--ochre)]" />
        </div>
        <p className="text-sm font-semibold text-[var(--muted)] uppercase tracking-widest">
          Loading
        </p>
      </div>
    </main>
  );
}
