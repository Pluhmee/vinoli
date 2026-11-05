import { Link } from 'react-router-dom';
import { Bike } from 'lucide-react';
import { buildTrackOrderUrl } from '@/config/routes';
import { usePortalSummary } from '@/hooks/useFoodDiscovery';
import { formatNgn } from '@/services/food.service';
import { useAppStore } from '@/store/useAppStore';

export function OrdersPage() {
  const activeZone = useAppStore((s) => s.activeZoneFilter);
  const { data, isLoading } = usePortalSummary(activeZone);

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
          Dispatch Queue
        </p>
        <h1 className="mt-1 font-display text-2xl font-extrabold text-ink">
          Live Rider Orders ({activeZone})
        </h1>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="rounded-card border border-line bg-surface-elevated p-8 text-center text-sm font-bold text-ink-muted">
            Loading dispatch queue...
          </div>
        ) : (
          data?.recentOrders.map((o) => (
            <div
              key={o.orderCode}
              className="flex flex-col justify-between gap-4 rounded-card border border-line bg-surface-elevated p-5 sm:flex-row sm:items-center"
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <Link
                    to={buildTrackOrderUrl(o.orderCode)}
                    className="font-mono text-sm font-extrabold text-brand hover:underline"
                  >
                    {o.orderCode}
                  </Link>
                  <span className="rounded-full bg-plum-soft px-2.5 py-0.5 text-xs font-bold text-ink">
                    {o.status === 'on_the_way' ? 'Rider En Route' : 'Kitchen Prepping'}
                  </span>
                </div>
                <p className="mt-1 font-bold text-ink">{o.spotName}</p>
                <p className="text-xs text-ink-muted">Drop-off: {o.deliveryAddress}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="inline-flex items-center gap-1 text-xs font-bold text-ink">
                    <Bike className="h-3.5 w-3.5 text-brand" />
                    {o.riderName}
                  </p>
                  <p className="font-mono text-sm font-extrabold text-brand">
                    {formatNgn(o.totalNgn)} · ~{o.etaMinutes}m
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
