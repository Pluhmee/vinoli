import { QueryClient } from '@tanstack/react-query';
import { ApiError } from '@/lib/apiClient';
import type { NearbySpotFilters } from '@/types/food';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

export const queryKeys = {
  spots: {
    all: ['spots'] as const,
    nearby: (filters: NearbySpotFilters) => ['spots', 'nearby', filters] as const,
    detail: (slug: string, lat: number, lng: number) =>
      ['spots', 'detail', slug, lat.toFixed(3), lng.toFixed(3)] as const,
  },
  orders: {
    byCode: (orderCode: string) =>
      ['orders', 'detail', orderCode.trim().toUpperCase()] as const,
    recent: ['orders', 'recent'] as const,
  },
  portal: {
    summary: (zone: string) => ['portal', 'summary', zone] as const,
  },
};
