import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Bike, CheckCircle2, Store } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useAppStore } from '@/store/useAppStore';

const PERKS = [
  {
    title: 'Location-Matched Hungry Customers',
    description:
      'Your kitchen surfaces automatically to customers within fast road reach of your neighborhood.',
    icon: Store,
  },
  {
    title: 'Instant Vinoli Rider Dispatch',
    description:
      'Focus on cooking—nearby thermal-bagged riders are assigned the moment you accept an order.',
    icon: Bike,
  },
  {
    title: 'Live Menu & Payout Dashboard',
    description:
      'Toggle item availability, watch prep times, and track daily settlements inside the Partner Portal.',
    icon: BarChart3,
  },
];

export function RestaurantPage() {
  const openAuthModal = useAppStore((s) => s.openAuthModal);

  return (
    <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-14 lg:px-8">
      <div className="grid items-center gap-8 rounded-[1.5rem] border border-line bg-surface-elevated p-5 shadow-soft sm:gap-10 sm:rounded-[1.75rem] sm:p-8 lg:grid-cols-12 lg:p-12">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center rounded-full bg-brand-soft px-3.5 py-1 text-xs font-extrabold text-brand">
            Vinoli for Restaurants &amp; Food Vendors
          </span>
          <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Grow your kitchen’s orders across your neighborhood.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-base">
            From beloved local bukas and suya spots to smash-burger kitchens and bakeries—plug into
            Vinoli’s road logistics network in less than 24 hours.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => openAuthModal('register', 'vendor_partner')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-extrabold text-brand-foreground shadow-brand transition hover:bg-brand-hover"
            >
              <span>Register Your Kitchen</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to={ROUTES.PORTAL.ROOT}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3.5 text-sm font-extrabold text-ink transition hover:border-brand"
            >
              <span>Open Restaurant Portal</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <img
            src="/images/spot-jollof.jpg"
            alt="Partner kitchen meal ready for dispatch"
            className="aspect-[4/3] w-full rounded-card object-cover shadow-elevated"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
        {PERKS.map((perk) => {
          const Icon = perk.icon;
          return (
            <div
              key={perk.title}
              className="rounded-card border border-line bg-surface-elevated p-5 shadow-soft sm:p-6"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-plum-soft text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-lg font-extrabold text-ink">
                {perk.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {perk.description}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-ink">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                <span>Zero setup fee</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
