import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bike, CheckCircle2, Clock, MapPin, Wallet } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { PRESET_LOCATIONS, useAppStore } from '@/store/useAppStore';

export function RiderPage() {
  const openAuthModal = useAppStore((s) => s.openAuthModal);
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [zone, setZone] = useState(PRESET_LOCATIONS[0].area);

  const handleApply = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-14 lg:px-8">
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-plum-soft px-3.5 py-1 text-xs font-extrabold text-ink">
            <Bike className="h-3.5 w-3.5 text-brand" />
            <span>Vinoli Rider Fleet</span>
          </span>
          <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Own the road. Earn on every neighborhood drop.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-base">
            Short neighborhood loops, instant payout tracking, and smart batching that keeps you
            moving close to your preferred zone.
          </p>

          <div className="mt-6 grid gap-3.5 sm:mt-8 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-card border border-line bg-surface-elevated p-4 sm:p-5">
              <Wallet className="h-5 w-5 text-brand" />
              <p className="mt-2.5 font-display text-base font-extrabold text-ink sm:mt-3 sm:text-lg">
                Daily Payouts
              </p>
              <p className="mt-1 text-xs text-ink-muted">Transparent per-km + drop bonuses.</p>
            </div>
            <div className="rounded-card border border-line bg-surface-elevated p-4 sm:p-5">
              <MapPin className="h-5 w-5 text-brand" />
              <p className="mt-2.5 font-display text-base font-extrabold text-ink sm:mt-3 sm:text-lg">
                Short Loops
              </p>
              <p className="mt-1 text-xs text-ink-muted">2–4 km local kitchen-to-door runs.</p>
            </div>
            <div className="rounded-card border border-line bg-surface-elevated p-4 sm:p-5">
              <Clock className="h-5 w-5 text-brand" />
              <p className="mt-2.5 font-display text-base font-extrabold text-ink sm:mt-3 sm:text-lg">
                Flexible Shifts
              </p>
              <p className="mt-1 text-xs text-ink-muted">Go online whenever you’re ready.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <Link
              to={ROUTES.PORTAL.ORDERS}
              className="font-extrabold text-brand hover:underline"
            >
              View live rider dispatch board →
            </Link>
            <button
              type="button"
              onClick={() => openAuthModal('login', 'dispatcher')}
              className="font-bold text-ink-muted hover:text-ink"
            >
              Existing rider? Sign in
            </button>
          </div>
        </div>

        {/* Rider Quick Signup Card */}
        <div className="lg:col-span-5">
          <div className="rounded-[1.5rem] border border-line bg-surface-elevated p-5 shadow-elevated sm:p-8">
            {submitted ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-brand" />
                <h2 className="mt-3 font-display text-xl font-extrabold text-ink">
                  Rider application received!
                </h2>
                <p className="mt-1.5 text-sm text-ink-muted">
                  We’ve queued <strong>{fullName}</strong> for onboarding in{' '}
                  <strong>{zone}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 rounded-full border border-line-strong px-5 py-2 text-xs font-extrabold text-ink"
                >
                  Register another rider
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <h2 className="font-display text-xl font-extrabold text-ink">
                  Start riding with Vinoli
                </h2>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tunde Balogun"
                    className="mt-1.5 w-full rounded-control border border-line-strong bg-surface px-4 py-3 text-base text-ink focus:border-brand focus:outline-none sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="mt-1.5 w-full rounded-control border border-line-strong bg-surface px-4 py-3 text-base text-ink focus:border-brand focus:outline-none sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Preferred Delivery Zone
                  </label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="mt-1.5 w-full rounded-control border border-line-strong bg-surface px-4 py-3 text-base font-bold text-ink focus:border-brand focus:outline-none sm:text-sm"
                  >
                    {PRESET_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.area}>
                        {loc.area}, {loc.city}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand py-3.5 text-sm font-extrabold text-brand-foreground shadow-brand transition hover:bg-brand-hover"
                >
                  Apply as a Vinoli Rider
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
