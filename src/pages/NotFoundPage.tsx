import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand">404</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink">
        Took a wrong turn down the road
      </h1>
      <p className="mt-2 max-w-md text-sm text-ink-muted">
        We couldn’t find that page—let’s get you back to hot food spots near your location.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          to={ROUTES.HOME}
          className="rounded-control bg-brand px-5 py-2.5 text-sm font-extrabold text-brand-foreground shadow-brand hover:bg-brand-hover"
        >
          Back to Vinoli Home
        </Link>
        <Link
          to={ROUTES.EXPLORE}
          className="rounded-control border border-line-strong bg-surface-elevated px-5 py-2.5 text-sm font-bold text-ink"
        >
          Explore Nearby
        </Link>
      </div>
    </div>
  );
}
