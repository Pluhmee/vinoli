import { type FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bike, CheckCircle2, Clock, Gift, MapPin, Phone, Search, Star } from 'lucide-react';
import { useOrderTracking } from '@/hooks/useFoodDiscovery';
import { formatNgn } from '@/services/food.service';
import { useAppStore } from '@/store/useAppStore';

export function TrackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeOrderCode = useAppStore((s) => s.activeOrderCode);
  const placedOrders = useAppStore((s) => s.placedOrders);

  const initialCode = searchParams.get('order') ?? activeOrderCode ?? 'VNL-4092';
  const [inputCode, setInputCode] = useState(initialCode);
  const [submittedCode, setSubmittedCode] = useState(initialCode);

  const { data: order, isLoading, isError, error } = useOrderTracking(submittedCode);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = inputCode.trim().toUpperCase();
    if (!cleaned) return;
    setSubmittedCode(cleaned);
    setSearchParams({ order: cleaned });
  };

  const quickCodes = [
    ...new Set([
      ...placedOrders.map((o) => o.orderCode),
      'VNL-4092',
    ]),
  ].slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
          Live Rider Tracker
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Track Your Meal on the Road
        </h1>
        <p className="mt-1.5 text-sm text-ink-muted">
          Follow kitchen prep and live Vinoli rider progress to your doorstep.
        </p>
      </div>

      {/* Order Code Search */}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter order code (e.g. VNL-4092)"
            className="w-full rounded-control border border-line-strong bg-surface-elevated py-3 pl-11 pr-4 font-mono text-base font-bold uppercase text-ink focus:border-brand focus:outline-none sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-control bg-brand px-6 py-3 text-sm font-extrabold text-brand-foreground shadow-brand transition hover:bg-brand-hover"
        >
          Track Order
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-ink-subtle">
        <span className="font-bold">Recent orders:</span>
        {quickCodes.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => {
              setInputCode(code);
              setSubmittedCode(code);
              setSearchParams({ order: code });
            }}
            className={`rounded-full border px-3 py-0.5 font-mono font-bold transition ${
              submittedCode === code
                ? 'border-plum bg-plum text-ink-inverse'
                : 'border-line bg-surface-elevated text-ink-muted hover:border-brand'
            }`}
          >
            {code}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {isLoading && (
          <div className="rounded-card border border-line bg-surface-elevated p-10 text-center text-sm font-bold text-ink-muted">
            Locating rider for {submittedCode}...
          </div>
        )}

        {isError && (
          <div className="rounded-card border border-alert/30 bg-alert/5 p-6 text-sm font-semibold text-alert">
            {error instanceof Error ? error.message : 'Order not found.'}
          </div>
        )}

        {order && !isLoading && (
          <div className="space-y-6">
            {/* Top Live Dispatch Card */}
            <div className="rounded-card border border-line bg-surface-elevated p-6 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
                <div>
                  <span className="font-mono text-xs font-bold text-brand">
                    ORDER {order.orderCode}
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-extrabold text-ink">
                    {order.spotName}
                  </h2>
                  <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                    <MapPin className="h-3.5 w-3.5 text-brand" />
                    <span>Dropping off at {order.deliveryAddress}</span>
                  </p>
                </div>

                <div className="rounded-2xl bg-plum px-5 py-3 text-right text-ink-inverse">
                  <div className="flex items-center justify-end gap-1.5 font-display text-xl font-extrabold text-brand">
                    <Clock className="h-4 w-4" />
                    <span>~{order.etaMinutes} mins</span>
                  </div>
                  <p className="text-[11px] text-ink-inverse/80">Estimated arrival</p>
                </div>
              </div>

              {/* Gift Recipient Arrival Strip (when order was sent to a friend) */}
              {order.giftRecipient && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-control border border-brand/35 bg-brand-soft px-4 py-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 shrink-0 text-brand" />
                    <span className="font-extrabold text-ink">
                      Delivering to {order.giftRecipient.recipientName} (
                      {order.giftRecipient.hubLabel})
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono font-bold text-ink">
                    <Phone className="h-3.5 w-3.5 text-brand" />
                    Rider calls {order.giftRecipient.recipientPhone}
                  </span>
                </div>
              )}

              {/* Rider Strip */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-control bg-plum-soft/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-brand-foreground">
                    <Bike className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-ink">{order.riderName}</p>
                    <p className="font-mono text-xs text-ink-muted">
                      Dispatch Bike · {order.riderBikePlate}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-surface-elevated px-3 py-1 text-xs font-extrabold text-ink">
                  <Star className="h-3.5 w-3.5 fill-brand text-brand" />
                  {order.riderRating.toFixed(1)} Rider Rating
                </span>
              </div>
            </div>

            {/* Steps + Order Receipt */}
            <div className="grid gap-6 md:grid-cols-12">
              <div className="rounded-card border border-line bg-surface-elevated p-6 md:col-span-7">
                <h3 className="font-display text-base font-extrabold text-ink">
                  Live Road Progress
                </h3>
                <ol className="mt-5 space-y-5">
                  {order.steps.map((step) => (
                    <li key={step.id} className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          className={`mt-0.5 h-5 w-5 shrink-0 ${
                            step.active
                              ? 'text-brand'
                              : step.completed
                                ? 'text-ink'
                                : 'text-line-strong'
                          }`}
                        />
                        <div>
                          <p className="text-sm font-extrabold text-ink">{step.title}</p>
                          <p className="text-xs text-ink-muted">{step.subtitle}</p>
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-xs font-bold text-brand">
                        {step.timeLabel}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-card border border-line bg-surface-elevated p-6 md:col-span-5">
                <h3 className="font-display text-base font-extrabold text-ink">
                  Order Summary
                </h3>
                <ul className="mt-4 space-y-2.5 border-b border-line pb-4 text-sm">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between gap-2">
                      <span className="text-ink-muted">
                        <strong className="text-ink">{item.quantity}×</strong> {item.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-ink">
                        {formatNgn(item.priceNgn * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex justify-between text-base font-extrabold text-ink">
                  <span>Total Paid</span>
                  <span className="font-mono text-brand">{formatNgn(order.totalNgn)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
