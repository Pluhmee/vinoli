import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { buildSpotUrl } from '@/config/routes';
import { usePortalSummary } from '@/hooks/useFoodDiscovery';
import { useAppStore } from '@/store/useAppStore';

export function KitchensPage() {
  const activeZone = useAppStore((s) => s.activeZoneFilter);
  const { data, isLoading } = usePortalSummary(activeZone);

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
          Merchant Directory
        </p>
        <h1 className="mt-1 font-display text-2xl font-extrabold text-ink">
          Partner Kitchens ({activeZone})
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {isLoading ? (
          <div className="col-span-full rounded-card border border-line bg-surface-elevated p-8 text-center text-sm font-bold text-ink-muted">
            Loading partner kitchens...
          </div>
        ) : (
          data?.spots.map((spot) => (
            <div
              key={spot.id}
              className="flex items-center justify-between gap-4 rounded-card border border-line bg-surface-elevated p-4"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={spot.coverImage}
                  alt={spot.name}
                  className="h-16 w-16 rounded-control object-cover"
                />
                <div>
                  <Link
                    to={buildSpotUrl(spot.slug)}
                    className="font-display text-base font-extrabold text-ink hover:text-brand"
                  >
                    {spot.name}
                  </Link>
                  <p className="text-xs text-ink-muted">
                    {spot.area} · {spot.menu.length} active dishes
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 rounded-full bg-plum-soft px-3 py-1 text-xs font-extrabold text-ink">
                <Star className="h-3.5 w-3.5 fill-brand text-brand" />
                {spot.rating.toFixed(1)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
