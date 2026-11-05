import { type FormEvent, useMemo, useState } from 'react';
import { Check, Search, Star, X } from 'lucide-react';
import {
  CATERING_SPECIALTIES,
  listOutdoorCaterers,
} from '@/services/catering.service';
import { formatNgn } from '@/services/food.service';
import { DELIVERY_CITY_HUBS } from '@/services/location.service';
import { useAppStore } from '@/store/useAppStore';
import type { EventSpecialty, OutdoorCaterer } from '@/types/food';

export function CateringPage() {
  const isCatererModalOpen = useAppStore((s) => s.isCatererModalOpen);
  const setCatererModalOpen = useAppStore((s) => s.setCatererModalOpen);

  const [hubFilter, setHubFilter] = useState('all_same_city');
  const [specialty, setSpecialty] = useState<EventSpecialty>('all');
  const [search, setSearch] = useState('');

  // Quote modal state
  const [quoteCaterer, setQuoteCaterer] = useState<OutdoorCaterer | null>(null);
  const [hostName, setHostName] = useState('');
  const [hostPhone, setHostPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('250');
  const [quoteSent, setQuoteSent] = useState(false);

  const caterers = useMemo(
    () => listOutdoorCaterers({ hubId: hubFilter, specialty, search }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hubFilter, specialty, search, isCatererModalOpen],
  );

  const handleQuoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    setQuoteSent(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Clean Editorial Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand">
            Outdoor Party &amp; Event Feasts
          </p>
          <h1
            style={{ fontFamily: "'Poppins', var(--font-display)" }}
            className="mt-2 text-2xl font-black uppercase tracking-tight text-ink sm:text-4xl"
          >
            Outdoor Event Caterers
          </h1>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-muted sm:text-base">
            Full-service chafing buffets, live party jollof stations, small chops, and
            event servers for weddings, birthdays, corporate summits, and family
            celebrations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCatererModalOpen(true)}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#2A054D] px-6 text-xs font-extrabold text-[#FDF9ED] transition hover:bg-brand hover:text-white dark:bg-brand dark:text-white dark:hover:bg-brand-hover sm:h-12 sm:text-sm"
        >
          Register as an event caterer
        </button>
      </div>

      {/* Search + Hub Filter */}
      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search caterer, dish, or city..."
            className="h-11 w-full rounded-full border border-line-strong bg-surface-elevated pl-11 pr-4 text-base font-medium text-ink placeholder:text-ink-subtle focus:border-brand focus:outline-none sm:text-sm"
          />
        </div>

        <select
          aria-label="Filter caterers by city hub"
          value={hubFilter}
          onChange={(e) => setHubFilter(e.target.value)}
          className="h-11 rounded-full border border-line-strong bg-surface-elevated px-4 text-base font-bold text-ink focus:border-brand focus:outline-none sm:text-xs"
        >
          <option value="all_same_city">All Nigerian hubs</option>
          {DELIVERY_CITY_HUBS.filter((h) => !h.isSameCityDefault).map((hub) => (
            <option key={hub.id} value={hub.id}>
              {hub.optionLabel}
            </option>
          ))}
        </select>
      </div>

      {/* Occasion Filter Pills */}
      <div className="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto pb-1">
        {CATERING_SPECIALTIES.map((spec) => {
          const active = specialty === spec.id;
          return (
            <button
              key={spec.id}
              type="button"
              onClick={() => setSpecialty(spec.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-extrabold transition ${
                active
                  ? 'border-[#2A054D] bg-[#2A054D] text-[#FDF9ED] dark:border-brand dark:bg-brand dark:text-white'
                  : 'border-line bg-surface-elevated text-ink hover:border-brand'
              }`}
            >
              {spec.label}
            </button>
          );
        })}
      </div>

      {/* Clean Directory Grid — Uncluttered photography, metadata cleanly below */}
      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caterers.length > 0 ? (
          caterers.map((cat) => (
            <article
              key={cat.id}
              className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface-elevated transition hover:border-brand/50"
            >
              {/* Clean Photo — Zero floating badge soup */}
              <div className="aspect-[16/10] overflow-hidden bg-surface-muted">
                <img
                  src={cat.coverImage}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Crisp Typography Below Photo */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-lg font-extrabold leading-snug text-ink">
                      {cat.name}
                    </h2>
                    <span className="inline-flex shrink-0 items-center gap-1 pt-0.5 text-xs font-extrabold text-ink">
                      <Star className="h-3.5 w-3.5 fill-[#FC7B0F] text-[#FC7B0F]" />
                      <span>{cat.rating.toFixed(1)}</span>
                      <span className="font-normal text-ink-subtle">
                        ({cat.eventsCompleted})
                      </span>
                    </span>
                  </div>

                  <p className="mt-1 text-xs font-semibold text-brand">
                    {cat.cityLabel} · {cat.minGuests}–{cat.maxGuests.toLocaleString()} guests
                  </p>

                  <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                    {cat.tagline}
                  </p>

                  <p className="mt-3 text-xs text-ink-subtle">
                    {cat.specialtyLabels.join(' · ')}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                  <div>
                    <span className="font-mono text-sm font-extrabold text-ink">
                      {formatNgn(cat.startingPerGuestNgn)}
                    </span>
                    <span className="text-xs text-ink-muted"> / guest</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setQuoteCaterer(cat);
                      setQuoteSent(false);
                    }}
                    className="rounded-full bg-[#2A054D] px-4 py-2 text-xs font-extrabold text-[#FDF9ED] transition hover:bg-brand hover:text-white dark:bg-brand dark:text-white dark:hover:bg-brand-hover"
                  >
                    Request quote
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full rounded-card border border-line bg-surface-elevated p-10 text-center">
            <p className="font-display text-lg font-extrabold text-ink">
              No caterers matched your filter
            </p>
            <button
              type="button"
              onClick={() => {
                setHubFilter('all_same_city');
                setSpecialty('all');
                setSearch('');
              }}
              className="mt-3 rounded-full bg-brand px-5 py-2 text-xs font-extrabold text-white"
            >
              Show all caterers
            </button>
          </div>
        )}
      </div>

      {/* Request Event Quote Modal */}
      {quoteCaterer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-5"
        >
          <button
            type="button"
            aria-label="Close quote modal"
            onClick={() => setQuoteCaterer(null)}
            className="fixed inset-0 bg-surface-inverse/65 backdrop-blur-sm"
          />
          <div className="relative z-10 my-auto w-full max-w-md rounded-[1.5rem] border border-line bg-surface-elevated p-5 shadow-elevated sm:p-7">
            <div className="flex items-center justify-between">
              <p className="text-xs font-extrabold uppercase tracking-wider text-brand">
                Event Quote Inquiry
              </p>
              <button
                type="button"
                onClick={() => setQuoteCaterer(null)}
                className="rounded-full p-1.5 text-ink-muted hover:bg-surface-muted hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {quoteSent ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-display text-xl font-extrabold text-ink">
                  Inquiry sent
                </h3>
                <p className="mt-1.5 text-sm text-ink-muted">
                  <strong className="text-ink">{quoteCaterer.name}</strong> received your
                  brief for <strong>{guestCount} guests</strong> and will contact{' '}
                  <strong>{hostPhone}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setQuoteCaterer(null)}
                  className="mt-5 rounded-full bg-brand px-6 py-2.5 text-xs font-extrabold text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="mt-3 space-y-3.5">
                <h3 className="font-display text-xl font-extrabold text-ink">
                  {quoteCaterer.name}
                </h3>
                <p className="text-xs text-ink-muted">
                  {quoteCaterer.cityLabel} · From{' '}
                  {formatNgn(quoteCaterer.startingPerGuestNgn)} / guest
                </p>

                <div>
                  <label className="block text-xs font-bold text-ink">Your name</label>
                  <input
                    required
                    type="text"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder="Full name"
                    className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base text-ink focus:border-brand focus:outline-none sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink">
                    Phone or WhatsApp
                  </label>
                  <input
                    required
                    type="tel"
                    value={hostPhone}
                    onChange={(e) => setHostPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base text-ink focus:border-brand focus:outline-none sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-ink">Event date</label>
                    <input
                      required
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3 py-2.5 text-base text-ink focus:border-brand focus:outline-none sm:text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">
                      Estimated guests
                    </label>
                    <input
                      required
                      type="number"
                      min={quoteCaterer.minGuests}
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3 py-2.5 font-mono text-base font-bold text-ink focus:border-brand focus:outline-none sm:text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-brand py-3 text-sm font-extrabold text-white transition hover:bg-brand-hover"
                >
                  Send quote request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CateringPage;
