import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import { foodService } from '@/services/food.service';
import type { NearbySpotFilters } from '@/types/food';

export function useNearbySpots(filters: NearbySpotFilters) {
  return useQuery({
    queryKey: queryKeys.spots.nearby(filters),
    queryFn: () => foodService.listNearbySpots(filters),
  });
}

export function useSpotDetail(slug: string, lat: number, lng: number) {
  return useQuery({
    queryKey: queryKeys.spots.detail(slug, lat, lng),
    queryFn: () => foodService.getSpotBySlug(slug, lat, lng),
    enabled: Boolean(slug),
  });
}

export function useOrderTracking(orderCode: string) {
  const normalized = orderCode.trim().toUpperCase();
  return useQuery({
    queryKey: queryKeys.orders.byCode(normalized),
    queryFn: () => foodService.getOrderByCode(normalized),
    enabled: normalized.length > 0,
  });
}

export function usePortalSummary(zone: string) {
  return useQuery({
    queryKey: queryKeys.portal.summary(zone),
    queryFn: () => foodService.getPortalSummary(zone),
  });
}
