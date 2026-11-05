import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import {
  CATERING_SPECIALTIES,
  registerOutdoorCaterer,
} from '@/services/catering.service';
import { DELIVERY_CITY_HUBS } from '@/services/location.service';
import { useAppStore } from '@/store/useAppStore';
import type { EventSpecialty } from '@/types/food';

const SELECTABLE_SPECIALTIES = CATERING_SPECIALTIES.filter(
  (s): s is { id: Exclude<EventSpecialty, 'all'>; label: string } => s.id !== 'all',
);

const CATERER_HUBS = DELIVERY_CITY_HUBS.filter((h) => !h.isSameCityDefault);

export function CatererRegisterModal() {
  const navigate = useNavigate();
  const { isCatererModalOpen, setCatererModalOpen } = useAppStore();

  const [brandName, setBrandName] = useState('');
  const [leadChef, setLeadChef] = useState('');
  const [phone, setPhone] = useState('');
  const [hubId, setHubId] = useState(CATERER_HUBS[0].id);
  const [maxGuests, setMaxGuests] = useState('500');
  const [startingPrice, setStartingPrice] = useState('7500');
  const [tagline, setTagline] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState<Exclude<EventSpecialty, 'all'>[]>([
    'weddings',
    'birthdays',
  ]);
  const [registeredName, setRegisteredName] = useState<string | null>(null);

  useEffect(() => {
    if (!isCatererModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCatererModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isCatererModalOpen, setCatererModalOpen]);

  if (!isCatererModalOpen) return null;

  const toggleSpecialty = (id: Exclude<EventSpecialty, 'all'>) => {
    setSelectedSpecs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleClose = () => {
    setRegisteredName(null);
    setCatererModalOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const hub = CATERER_HUBS.find((h) => h.id === hubId) ?? CATERER_HUBS[0];

    const created = registerOutdoorCaterer({
      name: brandName,
      leadChef,
      phone,
      hubId: hub.id,
      cityLabel: hub.shortLabel,
      specialties: selectedSpecs,
      minGuests: 50,
      maxGuests: Number(maxGuests) || 500,
      startingPerGuestNgn: Number(startingPrice) || 7500,
      tagline,
    });

    setRegisteredName(created.name);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="caterer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-5"
    >
      <button
        type="button"
        aria-label="Close caterer registration modal"
        onClick={handleClose}
        className="fixed inset-0 bg-surface-inverse/65 backdrop-blur-sm"
      />

      <div className="relative z-10 my-auto w-full max-w-lg max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[1.5rem] border border-line bg-surface-elevated p-5 shadow-elevated sm:max-h-[calc(100dvh-3rem)] sm:rounded-[1.75rem] sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand">
            Outdoor Catering Network
          </p>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-muted hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {registeredName ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
              <Check className="h-5 w-5" />
            </div>
            <h2
              id="caterer-modal-title"
              className="mt-3 font-display text-2xl font-extrabold text-ink"
            >
              Listing published
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              <strong className="text-ink">{registeredName}</strong> is now live in the
              Outdoor Event Caterers directory.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  navigate(ROUTES.CATERING);
                }}
                className="rounded-full bg-brand px-6 py-3 text-sm font-extrabold text-white hover:bg-brand-hover"
              >
                View listing →
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border border-line-strong px-5 py-3 text-sm font-extrabold text-ink"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2
              id="caterer-modal-title"
              className="mt-3 font-display text-xl font-extrabold text-ink sm:text-2xl"
            >
              Register as an outdoor event caterer
            </h2>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">
              Get booked directly for weddings, birthdays, corporate summits, and family
              celebrations.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-ink">
                  Catering business name
                </label>
                <input
                  required
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Emerald Canopy & Party Pots"
                  className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base font-medium text-ink focus:border-brand focus:outline-none sm:text-sm"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-ink">
                    Lead chef or contact name
                  </label>
                  <input
                    required
                    type="text"
                    value={leadChef}
                    onChange={(e) => setLeadChef(e.target.value)}
                    placeholder="Chef Ngozi Okonkwo"
                    className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base font-medium text-ink focus:border-brand focus:outline-none sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink">
                    Phone or WhatsApp
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base font-medium text-ink focus:border-brand focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-ink">Primary hub</label>
                  <select
                    value={hubId}
                    onChange={(e) => setHubId(e.target.value)}
                    className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3 py-2.5 text-base font-bold text-ink focus:border-brand focus:outline-none sm:text-xs"
                  >
                    {CATERER_HUBS.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.shortLabel}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink">Max capacity</label>
                  <select
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                    className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3 py-2.5 text-base font-bold text-ink focus:border-brand focus:outline-none sm:text-xs"
                  >
                    <option value="200">Up to 200 guests</option>
                    <option value="500">Up to 500 guests</option>
                    <option value="1000">Up to 1,000 guests</option>
                    <option value="2000">2,000+ guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink">
                    From (₦ / guest)
                  </label>
                  <input
                    required
                    type="number"
                    min={2500}
                    step={500}
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3 py-2.5 font-mono text-base font-bold text-ink focus:border-brand focus:outline-none sm:text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink">
                  Event specialties
                </label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {SELECTABLE_SPECIALTIES.map((spec) => {
                    const active = selectedSpecs.includes(spec.id);
                    return (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => toggleSpecialty(spec.id)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-extrabold transition ${
                          active
                            ? 'border-[#2A054D] bg-[#2A054D] text-[#FDF9ED] dark:border-brand dark:bg-brand dark:text-white'
                            : 'border-line bg-surface text-ink-muted hover:border-brand'
                        }`}
                      >
                        {spec.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-muted">
                  Signature setup &amp; dishes (optional)
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Chafing warmers, firewood jollof, small chops & stewards"
                  className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base font-medium text-ink focus:border-brand focus:outline-none sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-brand py-3.5 text-sm font-extrabold text-white transition hover:bg-brand-hover"
              >
                Publish caterer profile
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default CatererRegisterModal;
