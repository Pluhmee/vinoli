import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Bell,
  ChefHat,
  ChevronDown,
  Compass,
  Gift,
  LocateFixed,
  LogOut,
  Menu,
  Moon,
  ShoppingCart,
  Store,
  Sun,
  User,
  X,
} from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { PRESET_LOCATIONS, useAppStore } from '@/store/useAppStore';

/** Crisp inline Nigerian flag SVG so it renders identically across every OS & browser */
function NigeriaFlagIcon() {
  return (
    <svg
      viewBox="0 0 24 18"
      aria-hidden="true"
      className="h-3.5 w-4.5 shrink-0 overflow-hidden rounded-[3px] shadow-sm sm:h-4 sm:w-5"
    >
      <rect width="8" height="18" x="0" y="0" fill="#008751" />
      <rect width="8" height="18" x="8" y="0" fill="#FFFFFF" />
      <rect width="8" height="18" x="16" y="0" fill="#008751" />
    </svg>
  );
}

/** Circular bordered chevron matching the floating pill-island aesthetic */
function CircleChevron({
  accent = false,
  open = false,
}: {
  accent?: boolean;
  open?: boolean;
}) {
  return (
    <span
      className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 sm:h-5 sm:w-5 ${
        open ? 'rotate-180' : ''
      } ${
        accent
          ? 'border-brand text-brand'
          : 'border-ink/40 text-ink group-hover:border-brand group-hover:text-brand'
      }`}
    >
      <ChevronDown className="h-2.5 w-2.5 stroke-[2.5] sm:h-3 sm:w-3" />
    </span>
  );
}

export function Navbar() {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationMenuOpen, setLocationMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const {
    theme,
    toggleTheme,
    unreadNotifications,
    markNotificationsRead,
    openAuthModal,
    logout,
    session,
    userLocation,
    isLocating,
    setPresetLocation,
    detectCurrentLocation,
    cart,
    setCartOpen,
  } = useAppStore();

  const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0);

  const isOrderFoodActive =
    pathname === ROUTES.HOME ||
    pathname === ROUTES.EXPLORE ||
    pathname.startsWith('/spot/');

  const closeAllPopovers = () => {
    setLocationMenuOpen(false);
    setMoreMenuOpen(false);
    setNotifOpen(false);
    setAccountMenuOpen(false);
  };

  const firstName = session?.name.trim().split(' ')[0] ?? '';

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6 sm:py-3.5 lg:px-8">
        {/* LEFT ISLANDS: [ Vinoli Plum Capsule ] + [ 🇳🇬 Location Pill ⌄ ] */}
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2.5">
          {/* 1. Solid Royal Plum Brand Capsule */}
          <Link
            to={ROUTES.HOME}
            onClick={() => {
              closeAllPopovers();
              setMobileMenuOpen(false);
            }}
            className="inline-flex h-10 shrink-0 items-center rounded-full bg-[#2A054D] px-3.5 shadow-soft ring-1 ring-white/10 transition hover:scale-[1.01] hover:bg-[#350860] sm:h-11 sm:px-5 xl:h-12"
          >
            <img
              src="/vinoli-pill-logo.png"
              alt="Vinoli"
              className="h-5 w-auto sm:h-6 xl:h-7"
            />
          </Link>

          {/* 2. Country / Live Location Capsule */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setMoreMenuOpen(false);
                setNotifOpen(false);
                setAccountMenuOpen(false);
                setLocationMenuOpen((v) => !v);
              }}
              className="group inline-flex h-10 items-center gap-1.5 rounded-full border border-line/80 bg-surface-elevated px-2.5 text-xs font-extrabold text-ink shadow-soft transition hover:border-brand sm:h-11 sm:gap-2 sm:px-3.5 xl:h-12 xl:px-4"
              title={`Delivering around ${userLocation.area}, ${userLocation.city}`}
            >
              <NigeriaFlagIcon />
              <span className="hidden max-w-[5.5rem] truncate md:inline xl:max-w-[7.5rem]">
                {userLocation.area}
              </span>
              <span className="md:hidden">NG</span>
              <CircleChevron accent open={locationMenuOpen} />
            </button>

            {locationMenuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close location selector"
                  onClick={() => setLocationMenuOpen(false)}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <div className="fixed left-3 right-3 top-[4.15rem] z-20 rounded-[1.25rem] border border-line bg-surface-elevated p-3 shadow-elevated sm:absolute sm:left-0 sm:right-auto sm:top-full sm:mt-2.5 sm:w-72">
                  <button
                    type="button"
                    onClick={async () => {
                      await detectCurrentLocation();
                      setLocationMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-full bg-brand-soft px-4 py-2.5 text-left text-xs font-extrabold text-brand transition hover:bg-brand hover:text-brand-foreground"
                  >
                    <LocateFixed
                      className={`h-4 w-4 shrink-0 ${isLocating ? 'animate-spin' : ''}`}
                    />
                    <span>
                      {isLocating ? 'Detecting GPS...' : 'Use my current GPS location'}
                    </span>
                  </button>

                  <p className="mt-3 px-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
                    Delivery Neighborhoods (NG)
                  </p>
                  <div className="mt-1 max-h-60 space-y-0.5 overflow-y-auto">
                    {PRESET_LOCATIONS.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => {
                          setPresetLocation(loc.id);
                          setLocationMenuOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                          userLocation.area === loc.area
                            ? 'bg-plum-soft font-extrabold text-brand'
                            : 'font-semibold text-ink-muted hover:bg-surface-muted hover:text-ink'
                        }`}
                      >
                        <span>{loc.area}</span>
                        <span className="text-[11px] text-ink-subtle">{loc.city}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CENTER FLOATING PILL ISLAND: [ Order Food · Restaurant · Rider · Services ⌄ ] */}
        <nav
          aria-label="Main navigation"
          className="hidden h-11 items-center gap-5 rounded-full border border-line/80 bg-surface-elevated px-5 shadow-soft lg:flex xl:h-12 xl:gap-8 xl:px-8"
        >
          <Link
            to={ROUTES.HOME}
            onClick={closeAllPopovers}
            className={`whitespace-nowrap text-xs font-extrabold transition xl:text-sm ${
              isOrderFoodActive ? 'text-brand' : 'text-ink hover:text-brand'
            }`}
          >
            Order Food
          </Link>

          <NavLink
            to={ROUTES.RESTAURANT}
            onClick={closeAllPopovers}
            className={({ isActive }) =>
              `whitespace-nowrap text-xs font-extrabold transition xl:text-sm ${
                isActive ? 'text-brand' : 'text-ink hover:text-brand'
              }`
            }
          >
            Restaurant
          </NavLink>

          <NavLink
            to={ROUTES.RIDER}
            onClick={closeAllPopovers}
            className={({ isActive }) =>
              `whitespace-nowrap text-xs font-extrabold transition xl:text-sm ${
                isActive ? 'text-brand' : 'text-ink hover:text-brand'
              }`
            }
          >
            Rider
          </NavLink>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setLocationMenuOpen(false);
                setNotifOpen(false);
                setAccountMenuOpen(false);
                setMoreMenuOpen((v) => !v);
              }}
              className={`group inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-extrabold transition xl:gap-2 xl:text-sm ${
                pathname === ROUTES.TRACK || pathname === ROUTES.CATERING
                  ? 'text-brand'
                  : 'text-ink hover:text-brand'
              }`}
            >
              <span>Services</span>
              <CircleChevron open={moreMenuOpen} />
            </button>

            {moreMenuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close services menu"
                  onClick={() => setMoreMenuOpen(false)}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <div className="absolute right-0 top-full z-20 mt-3.5 w-64 rounded-[1.25rem] border border-line bg-surface-elevated p-2 shadow-elevated">
                  <Link
                    to={`${ROUTES.HOME}#order-for-friend`}
                    onClick={() => setMoreMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-ink transition hover:bg-surface-muted hover:text-brand"
                  >
                    <Gift className="h-4 w-4 shrink-0 text-brand" />
                    <span>Order Food for a Friend</span>
                  </Link>
                  <Link
                    to={ROUTES.CATERING}
                    onClick={() => setMoreMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-ink transition hover:bg-surface-muted hover:text-brand"
                  >
                    <ChefHat className="h-4 w-4 shrink-0 text-brand" />
                    <span>Outdoor Event Caterers</span>
                  </Link>
                  <Link
                    to={ROUTES.EXPLORE}
                    onClick={() => setMoreMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-ink transition hover:bg-surface-muted hover:text-brand"
                  >
                    <Compass className="h-4 w-4 shrink-0 text-brand" />
                    <span>Explore Nearby Kitchens</span>
                  </Link>
                  <Link
                    to={ROUTES.TRACK}
                    onClick={() => setMoreMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-ink transition hover:bg-surface-muted hover:text-brand"
                  >
                    <LocateFixed className="h-4 w-4 shrink-0 text-brand" />
                    <span>Live Rider Order Tracker</span>
                  </Link>
                  <Link
                    to={ROUTES.PORTAL.ROOT}
                    onClick={() => setMoreMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-ink transition hover:bg-surface-muted hover:text-brand"
                  >
                    <Store className="h-4 w-4 shrink-0 text-brand" />
                    <span>Partner &amp; Dispatch Portal</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* RIGHT ISLANDS: [ ☀️ Light ] + [ Login | Sign up ] + [ 🔔¹ ] + [ 🛒 ] */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* 1. Light / Dark Mode Pill */}
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden h-11 items-center justify-center gap-2 rounded-full border border-line/80 bg-surface-elevated px-3 text-xs font-extrabold text-ink shadow-soft transition hover:border-brand sm:inline-flex xl:h-12 xl:px-4 xl:text-sm"
            title="Switch appearance mode"
          >
            {theme === 'light' ? (
              <>
                <Sun className="h-4 w-4 shrink-0 fill-brand text-brand" />
                <span className="hidden xl:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 shrink-0 fill-brand text-brand" />
                <span className="hidden xl:inline">Dark</span>
              </>
            )}
          </button>

          {/* 2. Auth Capsule: [ Login | Sign up ] OR Signed-In User Menu */}
          {session ? (
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => {
                  setLocationMenuOpen(false);
                  setMoreMenuOpen(false);
                  setNotifOpen(false);
                  setAccountMenuOpen((v) => !v);
                }}
                className="group inline-flex h-11 items-center gap-2 rounded-full border border-line/80 bg-surface-elevated pl-3 pr-3.5 text-xs font-extrabold text-ink shadow-soft transition hover:border-brand xl:h-12 xl:text-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[11px] font-black text-white">
                  {firstName.charAt(0).toUpperCase() || 'V'}
                </span>
                <span className="max-w-[6rem] truncate">{firstName}</span>
                <CircleChevron open={accountMenuOpen} />
              </button>

              {accountMenuOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close account menu"
                    onClick={() => setAccountMenuOpen(false)}
                    className="fixed inset-0 z-10 cursor-default"
                  />
                  <div className="absolute right-0 top-full z-20 mt-2.5 w-56 rounded-[1.25rem] border border-line bg-surface-elevated p-2 shadow-elevated">
                    <div className="border-b border-line px-3 py-2">
                      <p className="truncate text-xs font-extrabold text-ink">
                        {session.name}
                      </p>
                      <p className="truncate text-[11px] text-ink-subtle">
                        {session.organization}
                      </p>
                    </div>
                    <Link
                      to={ROUTES.TRACK}
                      onClick={() => setAccountMenuOpen(false)}
                      className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-ink hover:bg-surface-muted hover:text-brand"
                    >
                      <LocateFixed className="h-3.5 w-3.5 text-brand" />
                      <span>My Active Orders</span>
                    </Link>
                    {session.role !== 'customer' && (
                      <Link
                        to={ROUTES.PORTAL.ROOT}
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-ink hover:bg-surface-muted hover:text-brand"
                      >
                        <Store className="h-3.5 w-3.5 text-brand" />
                        <span>Partner Portal</span>
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setAccountMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-bold text-alert hover:bg-alert/10"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden h-11 items-center rounded-full border border-line/80 bg-surface-elevated p-1 shadow-soft md:inline-flex xl:h-12">
              <button
                type="button"
                onClick={() => {
                  closeAllPopovers();
                  openAuthModal('login');
                }}
                className="rounded-full px-3.5 py-1.5 text-xs font-extrabold text-ink transition hover:text-brand xl:px-4 xl:text-sm"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  closeAllPopovers();
                  openAuthModal('register');
                }}
                className="rounded-full bg-[#2A054D] px-3.5 py-1.5 text-xs font-extrabold text-[#FDF9ED] transition hover:bg-brand hover:text-white dark:bg-brand dark:text-white dark:hover:bg-brand-hover xl:px-4 xl:text-sm"
              >
                Sign up
              </button>
            </div>
          )}

          {/* 3. Notification Bell Circle Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setLocationMenuOpen(false);
                setMoreMenuOpen(false);
                setAccountMenuOpen(false);
                setNotifOpen((v) => !v);
                markNotificationsRead();
              }}
              aria-label="Notifications"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/80 bg-surface-elevated text-ink shadow-soft transition hover:border-brand hover:text-brand sm:h-11 sm:w-11 xl:h-12 xl:w-12"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-alert px-1 text-[10px] font-extrabold text-white shadow-sm sm:h-5 sm:min-w-[1.25rem] sm:text-[11px]">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {notifOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close notifications"
                  onClick={() => setNotifOpen(false)}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <div className="fixed left-3 right-3 top-[4.15rem] z-20 rounded-[1.25rem] border border-line bg-surface-elevated p-4 shadow-elevated sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2.5 sm:w-80">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-ink">
                      Dispatch Updates
                    </p>
                    <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold text-brand">
                      Live
                    </span>
                  </div>
                  <Link
                    to={ROUTES.TRACK}
                    onClick={() => setNotifOpen(false)}
                    className="mt-3 block rounded-xl bg-surface p-3 transition hover:bg-plum-soft"
                  >
                    <p className="text-xs font-extrabold text-ink">
                      Rider Tunde picked up VNL-4092
                    </p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      Heading toward {userLocation.area} · ~14 mins away. Tap to track →
                    </p>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* 4. Circular Cart Button */}
          <button
            type="button"
            onClick={() => {
              closeAllPopovers();
              setCartOpen(true);
            }}
            aria-label="Open order bag"
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-soft transition sm:h-11 sm:w-11 xl:h-12 xl:w-12 ${
              totalItems > 0
                ? 'border-brand bg-brand text-brand-foreground shadow-brand hover:bg-brand-hover'
                : 'border-line/80 bg-surface-elevated text-brand hover:border-brand'
            }`}
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#2A054D] px-1 text-[10px] font-extrabold text-[#FDF9ED] sm:h-5 sm:min-w-[1.25rem] sm:text-[11px]">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile / Tablet Hamburger Circle */}
          <button
            type="button"
            onClick={() => {
              closeAllPopovers();
              setMobileMenuOpen((v) => !v);
            }}
            aria-label="Toggle mobile menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/80 bg-surface-elevated text-ink shadow-soft sm:h-11 sm:w-11 lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Floating Drawer Card */}
      {mobileMenuOpen && (
        <div className="mx-3 mb-3 rounded-[1.5rem] border border-line bg-surface-elevated p-4 shadow-elevated sm:mx-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              to={ROUTES.HOME}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-full px-4 py-2.5 text-sm font-extrabold ${
                isOrderFoodActive ? 'bg-brand text-brand-foreground' : 'text-ink'
              }`}
            >
              Order Food
            </Link>
            <Link
              to={ROUTES.RESTAURANT}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-full px-4 py-2.5 text-sm font-extrabold ${
                pathname === ROUTES.RESTAURANT
                  ? 'bg-brand text-brand-foreground'
                  : 'text-ink'
              }`}
            >
              Restaurant
            </Link>
            <Link
              to={ROUTES.RIDER}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-full px-4 py-2.5 text-sm font-extrabold ${
                pathname === ROUTES.RIDER ? 'bg-brand text-brand-foreground' : 'text-ink'
              }`}
            >
              Rider
            </Link>
            <Link
              to={`${ROUTES.HOME}#order-for-friend`}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full px-4 py-2.5 text-sm font-extrabold text-ink-muted hover:text-ink"
            >
              Order for a Friend
            </Link>
            <Link
              to={ROUTES.CATERING}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-full px-4 py-2.5 text-sm font-extrabold ${
                pathname === ROUTES.CATERING
                  ? 'bg-brand text-brand-foreground'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Outdoor Event Caterers
            </Link>
            <Link
              to={ROUTES.EXPLORE}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full px-4 py-2.5 text-sm font-extrabold text-ink-muted hover:text-ink"
            >
              Explore Nearby Spots
            </Link>
            <Link
              to={ROUTES.TRACK}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full px-4 py-2.5 text-sm font-extrabold text-ink-muted hover:text-ink"
            >
              Track Live Order
            </Link>
            <Link
              to={ROUTES.PORTAL.ROOT}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full px-4 py-2.5 text-sm font-extrabold text-ink-muted hover:text-ink"
            >
              Partner &amp; Dispatch Portal
            </Link>

            {/* Appearance Toggle */}
            <div className="mt-3 border-t border-line pt-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-xs font-extrabold text-ink"
              >
                {theme === 'light' ? (
                  <>
                    <Sun className="h-4 w-4 text-brand" />
                    <span>Appearance: Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 text-brand" />
                    <span>Appearance: Dark Mode</span>
                  </>
                )}
              </button>

              {/* Auth Actions on Mobile */}
              {session ? (
                <div className="mt-2.5 flex items-center justify-between rounded-2xl bg-surface p-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-black text-white">
                      <User className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-extrabold text-ink">
                        {session.name}
                      </p>
                      <p className="truncate text-[11px] text-ink-subtle">
                        {session.organization}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-full px-3 py-1.5 text-xs font-extrabold text-alert hover:bg-alert/10"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="inline-flex items-center justify-center rounded-full border border-line-strong bg-surface px-4 py-2.5 text-xs font-extrabold text-ink"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('register');
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2.5 text-xs font-extrabold text-brand-foreground shadow-brand"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
