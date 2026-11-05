import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Gift, MapPin, Search, X } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useNearbySpots } from '@/hooks/useFoodDiscovery';
import { CUISINE_CATEGORIES } from '@/services/food.service';
import { useAppStore } from '@/store/useAppStore';
import { HeroSection } from './HeroSection';
import { GiftOrderSection } from './GiftOrderSection';
import { OutdoorCateringSection } from './OutdoorCateringSection';
import { FoodSpotCard } from '@/components/food/FoodSpotCard';
import type { CuisineCategory } from '@/types/food';

export function HomePage() {
  const { hash } = useLocation();
  const spotsRef = useRef<HTMLElement | null>(null);
  const userLocation = useAppStore((s) => s.userLocation);
  const giftRecipient = useAppStore((s) => s.giftRecipient);
  const clearGiftRecipient = useAppStore((s) => s.clearGiftRecipient);

  const [dishFilter, setDishFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CuisineCategory>('all');

  const { data: spots, isLoading } = useNearbySpots({
    lat: userLocation.lat,
    lng: userLocation.lng,
    category: selectedCategory,
    search: dishFilter,
  });

  const scrollToNearbySpots = () => {
    spotsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Support smooth anchor jumps (e.g. /#order-for-friend or /#outdoor-catering)
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.replace('#', ''));
    if (el) {
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  }, [hash]);

  return (
    <div>
      {/* Location-First Poster Hero */}
      <HeroSection onLocationSelected={scrollToNearbySpots} />

      {/* Nearby Food Spots Marketplace */}
      <section ref={spotsRef} className="py-8 sm:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          {/* Active Gift Mode Strip above Kitchens */}
          {giftRecipient && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-brand/35 bg-brand-soft px-4 py-2.5 text-xs">
              <p className="inline-flex items-center gap-2 font-extrabold text-ink">
                <Gift className="h-4 w-4 shrink-0 text-brand" />
                <span>
                  Ordering for <span className="text-brand">{giftRecipient.recipientName}</span>{' '}
                  ({giftRecipient.hubLabel}) · Rider calls {giftRecipient.recipientPhone}
                </span>
              </p>
              <button
                type="button"
                onClick={clearGiftRecipient}
                className="font-extrabold text-ink-muted underline hover:text-alert"
              >
                Order for myself instead
              </button>
            </div>
          )}

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="min-w-0">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Food spots around <span className="text-brand">{userLocation.area}</span>
              </h2>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted sm:text-sm">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" />
                <span className="truncate">
                  {userLocation.streetHint} · Sorted by closest road distance
                </span>
              </p>
            </div>

            <div className="flex w-full items-center gap-3 md:w-auto">
              {/* Quick meal filter — stretches cleanly on mobile, compact on desktop */}
              <div className="relative min-w-0 flex-1 md:w-56 md:flex-none">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-subtle" />
                <input
                  type="text"
                  value={dishFilter}
                  onChange={(e) => setDishFilter(e.target.value)}
                  placeholder="Filter dishes..."
                  className="h-10 w-full rounded-full border border-line bg-surface-elevated pl-9 pr-8 text-base font-semibold text-ink placeholder:text-ink-subtle focus:border-brand focus:outline-none sm:text-xs"
                />
                {dishFilter && (
                  <button
                    type="button"
                    onClick={() => setDishFilter('')}
                    aria-label="Clear dish filter"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <Link
                to={ROUTES.EXPLORE}
                className="inline-flex shrink-0 items-center gap-1.5 text-xs font-extrabold text-ink transition hover:text-brand sm:text-sm"
              >
                <span>See all</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Cuisine Filter Pills */}
          <div className="no-scrollbar mt-5 flex items-center gap-2 overflow-x-auto pb-1 sm:mt-6">
            {CUISINE_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-extrabold transition sm:px-4 sm:text-sm ${
                    active
                      ? 'border-[#2A054D] bg-[#2A054D] text-[#FDF9ED] dark:border-brand dark:bg-brand dark:text-white'
                      : 'border-line bg-surface-elevated text-ink hover:border-brand'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Restaurant Cards Grid */}
          <div className="mt-6 grid gap-5 sm:mt-7 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-96 animate-pulse rounded-card border border-line bg-surface-muted/70"
                />
              ))
            ) : spots && spots.length > 0 ? (
              spots.map((spot) => <FoodSpotCard key={spot.id} spot={spot} />)
            ) : (
              <div className="col-span-full rounded-card border border-line bg-surface-elevated p-8 text-center sm:p-12">
                <p className="font-display text-lg font-extrabold text-ink">
                  No kitchens matched “{dishFilter}”
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDishFilter('');
                    setSelectedCategory('all');
                  }}
                  className="mt-3 rounded-full bg-brand px-5 py-2 text-xs font-extrabold text-white"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          FUNCTION 1 (SEPARATE): Order Food for a Friend or Loved One
      ==================================================================== */}
      <GiftOrderSection onRecipientReady={scrollToNearbySpots} />

      {/* ====================================================================
          FUNCTION 2 (SEPARATE): Outdoor Party & Event Feasts (Caterers)
      ==================================================================== */}
      <OutdoorCateringSection />
    </div>
  );
}
