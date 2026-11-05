import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { PRESET_LOCATIONS } from '@/store/useAppStore';

export function Footer() {
  return (
    <footer className="bg-surface-inverse text-ink-inverse">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <img src="/vinoli-pill-logo.png" alt="Vinoli" className="h-9 w-auto" />
          <p className="mt-3 text-sm font-semibold tracking-wide text-ink-inverse/90">
            Food Logistics. <span className="font-extrabold italic text-brand">Made Easy.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-inverse/70">
            Pinpoint your location, explore top-rated kitchens and local favorites around you,
            and get hot meals delivered fast down your street.
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
            Vinoli
          </p>
          <ul className="mt-3.5 space-y-2.5 text-sm text-ink-inverse/75">
            <li>
              <Link to={ROUTES.HOME} className="hover:text-brand">
                Order Food
              </Link>
            </li>
            <li>
              <Link to={ROUTES.RESTAURANT} className="hover:text-brand">
                Restaurants
              </Link>
            </li>
            <li>
              <Link to={ROUTES.RIDER} className="hover:text-brand">
                Riders
              </Link>
            </li>
            <li>
              <Link to={ROUTES.TRACK} className="hover:text-brand">
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
            Active Corridors
          </p>
          <ul className="mt-3.5 grid grid-cols-2 gap-2 text-sm text-ink-inverse/75">
            {PRESET_LOCATIONS.map((loc) => (
              <li key={loc.id}>{loc.area}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
            Dispatch Hours
          </p>
          <p className="mt-3.5 text-sm text-ink-inverse/75">Daily · 7:30 AM – 11:30 PM</p>
          <p className="mt-2 text-xs text-ink-inverse/55">
            Avg. neighbourhood drop-off in 18 mins.
          </p>
        </div>
      </div>

      <div className="border-t border-ink-inverse/10 px-4 py-5 text-center text-xs text-ink-inverse/55">
        © {new Date().getFullYear()} Vinoli Technologies. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
