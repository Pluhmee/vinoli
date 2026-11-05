import { Link } from 'react-router-dom';
import { ArrowRight, Bike, Clock, Store, UtensilsCrossed } from 'lucide-react';
import { buildTrackOrderUrl, ROUTES } from '@/config/routes';
import { usePortalSummary } from '@/hooks/useFoodDiscovery';
import { formatNgn } from '@/services/food.service';
import { useAppStore } from '@/store/useAppStore';

export function OverviewPage() {
  const activeZone = useAppStore((s) => s.activeZoneFilter);
  const { data, isLoading } = usePortalSummary(activeZone);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
            Partner &amp; Dispatch Hub
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">
            {activeZone} Operations
          </h1>
        </div>
        <Link
          to={ROUTES.PORTAL.ORDERS}
          className="inline-flex items-center gap-1.5 text-sm font-extrabold text-brand hover:underline"
        >
          <span>View all live rider loops</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-card border border-line bg-surface-elevated p-5 shadow-sm">
          <div className="flex items-center justify-between text-ink-subtle">
            <span className="font-mono text-xs font-semibold uppercase">Live Orders</span>
            <UtensilsCrossed className="h-4 w-4 text-brand" />
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold text-ink">
            {isLoading ? '—' : data?.summary.liveOrders}
          </p>
          <p className="mt-1 text-xs text-ink-muted">Prepping &amp; on road now</p>
        </div>

        <div className="rounded-card border border-line bg-surface-elevated p-5 shadow-sm">
          <div className="flex items-center justify-between text-ink-subtle">
            <span className="font-mono text-xs font-semibold uppercase">Riders Online</span>
            <Bike className="h-4 w-4 text-brand" />
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold text-ink">
            {isLoading ? '—' : data?.summary.onlineRiders}
          </p>
          <p className="mt-1 text-xs text-ink-muted">Active dispatch bikes</p>
        </div>

        <div className="rounded-card border border-line bg-surface-elevated p-5 shadow-sm">
          <div className="flex items-center justify-between text-ink-subtle">
            <span className="font-mono text-xs font-semibold uppercase">Kitchens Open</span>
            <Store className="h-4 w-4 text-brand" />
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold text-ink">
            {isLoading ? '—' : data?.summary.partnerKitchensOpen}
          </p>
          <p className="mt-1 text-xs text-ink-muted">Accepting Vinoli bags</p>
        </div>

        <div className="rounded-card border border-line bg-surface-elevated p-5 shadow-sm">
          <div className="flex items-center justify-between text-ink-subtle">
            <span className="font-mono text-xs font-semibold uppercase">Avg Drop-Off</span>
            <Clock className="h-4 w-4 text-brand" />
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold text-brand">
            {isLoading ? '—' : `${data?.summary.avgDeliveryMins} min`}
          </p>
          <p className="mt-1 text-xs text-ink-muted">Kitchen seal to doorstep</p>
        </div>
      </div>

      {/* Live Orders Table */}
      <div className="overflow-hidden rounded-card border border-line bg-surface-elevated shadow-sm">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-base font-extrabold text-ink">
            Active Customer Orders
          </h2>
          <span className="font-mono text-xs font-semibold text-ink-subtle">
            {data?.recentOrders.length ?? 0} tracked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface-muted/60 font-mono text-xs uppercase text-ink-subtle">
              <tr>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Kitchen &amp; Drop-Off</th>
                <th className="px-6 py-3">Rider</th>
                <th className="px-6 py-3">ETA</th>
                <th className="px-6 py-3">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data?.recentOrders.map((o) => (
                <tr key={o.orderCode} className="hover:bg-surface-muted/40">
                  <td className="px-6 py-4 font-mono font-bold">
                    <Link
                      to={buildTrackOrderUrl(o.orderCode)}
                      className="text-brand hover:underline"
                    >
                      {o.orderCode}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-ink">{o.spotName}</p>
                    <p className="text-xs text-ink-muted">{o.deliveryAddress}</p>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-ink">{o.riderName}</td>
                  <td className="px-6 py-4 font-mono text-xs font-bold text-brand">
                    ~{o.etaMinutes} min
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-ink">
                    {formatNgn(o.totalNgn)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
