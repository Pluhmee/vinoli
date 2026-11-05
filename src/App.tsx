import { type ReactNode, useEffect } from 'react';
import {
  BrowserRouter,
  MemoryRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { ROUTES } from '@/config/routes';
import { queryClient } from '@/lib/queryClient';
import { useAppStore } from '@/store/useAppStore';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { MarketingLayout } from '@/layouts/MarketingLayout';
import { PortalLayout } from '@/layouts/PortalLayout';

/* Eagerly imported views for instant zero-waterfall rendering */
import { HomePage } from '@/pages/marketing/HomePage';
import { ExplorePage } from '@/pages/marketing/ExplorePage';
import { CateringPage } from '@/pages/marketing/CateringPage';
import { RestaurantPage } from '@/pages/marketing/RestaurantPage';
import { RiderPage } from '@/pages/marketing/RiderPage';
import { SpotMenuPage } from '@/pages/marketing/SpotMenuPage';
import { TrackPage } from '@/pages/marketing/TrackPage';
import { OverviewPage } from '@/pages/portal/OverviewPage';
import { OrdersPage } from '@/pages/portal/OrdersPage';
import { KitchensPage } from '@/pages/portal/KitchensPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

/**
 * Uses BrowserRouter in standard HTTP(S) origins, and gracefully falls back
 * to MemoryRouter inside sandboxed iframes (e.g. `origin === "null"` or `srcdoc`)
 * where History API pushState/replaceState is restricted.
 */
function canUseBrowserHistory(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const { protocol, origin } = window.location;
    if ((protocol !== 'http:' && protocol !== 'https:') || origin === 'null') {
      return false;
    }
    window.history.replaceState(window.history.state, '', window.location.href);
    return true;
  } catch {
    return false;
  }
}

const USE_BROWSER_ROUTER = canUseBrowserHistory();

function AppRouter({ children }: { children: ReactNode }) {
  if (USE_BROWSER_ROUTER) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }
  return <MemoryRouter initialEntries={[ROUTES.HOME]}>{children}</MemoryRouter>;
}

function ScrollAndThemeSync() {
  const { pathname } = useLocation();
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch {
      // Ignore in restricted iframe contexts
    }
  }, [pathname]);

  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch {
      // Ignore if documentElement access is restricted
    }
  }, [theme]);

  return null;
}

export function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppRouter>
          <ScrollAndThemeSync />
          <Routes>
            {/* Customer Discovery, Restaurant, Rider & Live Order Tracker */}
            <Route element={<MarketingLayout />}>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path="/index.html" element={<Navigate to={ROUTES.HOME} replace />} />
              <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />
              <Route path={ROUTES.CATERING} element={<CateringPage />} />
              <Route path={ROUTES.RESTAURANT} element={<RestaurantPage />} />
              <Route path={ROUTES.RIDER} element={<RiderPage />} />
              <Route path={ROUTES.SPOT_DETAIL} element={<SpotMenuPage />} />
              <Route path={ROUTES.TRACK} element={<TrackPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Partner Kitchen & Dispatch Operations Portal */}
            <Route path={ROUTES.PORTAL.ROOT} element={<PortalLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path={ROUTES.PORTAL.ORDERS} element={<OrdersPage />} />
              <Route path={ROUTES.PORTAL.KITCHENS} element={<KitchensPage />} />
            </Route>
          </Routes>
        </AppRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
