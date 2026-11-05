export function PageLoader({ label = 'Loading view...' }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[45vh] flex-col items-center justify-center gap-3 text-ink-muted"
    >
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-brand" />
      <span className="font-mono text-xs uppercase tracking-wider">{label}</span>
    </div>
  );
}
