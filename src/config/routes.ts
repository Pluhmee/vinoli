
/**
 * Centralized route definitions for Vinoli's customer discovery experience,
 * outdoor catering marketplace, partner onboarding pages, and dispatch portal.
 */
export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  CATERING: '/catering',
  RESTAURANT: '/restaurant',
  RIDER: '/rider',
  SPOT_DETAIL: '/spot/:slug',
  TRACK: '/track',
  PORTAL: {
    ROOT: '/portal',
    ORDERS: '/portal/orders',
    KITCHENS: '/portal/kitchens',
  },
} as const;

export function buildSpotUrl(slug: string): string {
  return `/spot/${encodeURIComponent(slug)}`;
}

export function buildTrackOrderUrl(orderCode?: string): string {
  if (!orderCode?.trim()) return ROUTES.TRACK;
  return `${ROUTES.TRACK}?order=${encodeURIComponent(orderCode.trim().toUpperCase())}`;
}
