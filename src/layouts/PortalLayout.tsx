import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  ArrowLeft,
  Bike,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Store,
} from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { PRESET_LOCATIONS, useAppStore } from '@/store/useAppStore';

const PORTAL_LINKS = [
  { label: 'Dispatch Overview', to: ROUTES.PORTAL.ROOT, icon: LayoutDashboard, end: true },
  { label: 'Live Rider Orders', to: ROUTES.PORTAL.ORDERS, icon: Bike },
  { label: 'Partner Kitchens', to: ROUTES.PORTAL.KITCHENS, icon: Store },
];

export function PortalLayout() {
  const {
    isSidebarCollapsed,
    toggleSidebar,
    activeZoneFilter,
    setActiveZoneFilter,
    session,
  } = useAppStore();

  const zoneOptions = ['All Zones', ...PRESET_LOCATIONS.map((l) => l.area)];

  return (
    <div className="flex min-h-screen bg-surface text-ink">
      {/* Desktop / Tablet Sidebar */}
      <aside
        className={`hidden flex-col border-r border-line bg-surface-elevated transition-all duration-200 md:flex ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-4">
          <Link to={ROUTES.HOME} className="flex items-center gap-2.5 overflow-hidden">
            {isSidebarCollapsed ? (
              <img src="/vinoli-mark.png" alt="Vinoli" className="h-8 w-auto shrink-0" />
            ) : (
              <div className="inline-flex items-center rounded-full bg-[#2A054D] px-3.5 py-1.5">
                <img src="/vinoli-pill-logo.png" alt="Vinoli" className="h-5 w-auto" />
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-control p-1.5 text-ink-subtle hover:bg-surface-muted hover:text-ink"
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3" aria-label="Portal navigation">
          {PORTAL_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-control px-3 py-2.5 text-sm font-bold transition ${
                    isActive
                      ? 'bg-[#2A054D] text-[#FDF9ED] dark:bg-brand dark:text-white'
                      : 'text-ink-muted hover:bg-surface-muted hover:text-ink'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-line p-3">
          {!isSidebarCollapsed && (
            <div className="mb-3 rounded-control bg-plum-soft p-3">
              <p className="truncate text-xs font-extrabold text-ink">
                {session?.name ?? 'Partner Operations'}
              </p>
              <p className="truncate text-xs text-ink-muted">
                {session?.organization ?? 'Vinoli Dispatch Hub'}
              </p>
            </div>
          )}
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 rounded-control px-3 py-2 text-xs font-bold text-ink-muted hover:bg-surface-muted hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
            {!isSidebarCollapsed && <span>Back to Customer Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-line bg-surface-elevated/95 backdrop-blur">
          <div className="flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <Link
                to={ROUTES.HOME}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-2.5 py-1.5 text-xs font-bold text-ink md:hidden"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Site</span>
              </Link>
              <span className="hidden font-mono text-xs font-semibold uppercase tracking-wider text-ink-subtle sm:inline">
                Neighborhood Zone
              </span>
              <select
                aria-label="Filter portal by delivery zone"
                value={activeZoneFilter}
                onChange={(e) => setActiveZoneFilter(e.target.value)}
                className="min-w-0 max-w-[11rem] rounded-control border border-line-strong bg-surface px-2.5 py-1.5 text-xs font-bold text-ink focus:border-brand focus:outline-none sm:max-w-none sm:px-3 sm:text-sm"
              >
                {zoneOptions.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden items-center gap-2 text-xs font-semibold text-ink-muted sm:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-brand" />
              <span>Vendor &amp; Rider Dispatch Live</span>
            </div>
          </div>

          {/* Mobile Portal Tab Bar (< md) */}
          <nav
            aria-label="Mobile portal navigation"
            className="no-scrollbar flex items-center gap-1.5 overflow-x-auto border-t border-line px-3 py-2 md:hidden"
          >
            {PORTAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold transition ${
                      isActive
                        ? 'bg-[#2A054D] text-[#FDF9ED] dark:bg-brand dark:text-white'
                        : 'bg-surface text-ink-muted'
                    }`
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </header>

        <main className="flex-1 p-3 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
