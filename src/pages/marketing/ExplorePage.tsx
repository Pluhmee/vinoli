import { useState } from 'react';
import { LocateFixed, MapPin, Search } from 'lucide-react';
import { useNearbySpots } from '@/hooks/useFoodDiscovery';
import { CUISINE_CATEGORIES } from '@/services/food.service';
import { PRESET_LOCATIONS, useAppStore } from '@/store/useAppStore';
import { FoodSpotCard } from '@/components/food/FoodSpotCard';
import type { CuisineCategory } from '@/types/food';

export function ExplorePage() {
  const { userLocation, isLocating, setPresetLocation, detectCurrentLocation } = useAppStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CuisineCategory>('all');

  const { data: spots, isLoading } = useNearbySpots({
    lat: userLocation.lat,
    lng: userLocation.lng,
    category,
    search,
  });

  return (
    <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header + Location Switcher */}
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:pb-8 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>Delivering around {userLocation.area}, {userLocation.city}</span>
          </div>
          <h1 className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Explore Nearby Kitchens
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Search dishes, bukas, grills, and restaurants sorted by distance from your pin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Choose neighborhood"
            value={
              PRESET_LOCATIONS.find((l) => l.area === userLocation.area)?.id ??
              PRESET_LOCATIONS[0].id
            }
            onChange={(e) => setPresetLocation(e.target.value)}
            className="min-w-0 flex-1 rounded-control border border-line-strong bg-surface-elevated px-3.5 py-2.5 text-base font-bold text-ink focus:border-brand focus:outline-none sm:flex-none sm:text-xs"
          >
            {PRESET_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.area}, {loc.city}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={detectCurrentLocation}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-control bg-plum-soft px-3.5 py-2.5 text-xs font-extrabold text-ink transition hover:bg-plum hover:text-ink-inverse"
          >
            <LocateFixed className={`h-3.5 w-3.5 text-brand ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'Refresh GPS'}</span>
          </button>
        </div>
      </div>

      {/* Dish / Restaurant Search + Category Pills */}
      <div className="mt-6 space-y-4 sm:mt-8">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jollof, shawarma, smash burger, suya..."
            className="w-full rounded-full border border-line-strong bg-surface-elevated py-3 pl-11 pr-4 text-base font-medium text-ink placeholder:text-ink-subtle focus:border-brand focus:outline-none sm:text-sm"
          />
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {CUISINE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-extrabold transition sm:px-4 ${
                category === cat.id
                  ? 'border-[#2A054D] bg-[#2A054D] text-[#FDF9ED] dark:border-brand dark:bg-brand dark:text-white'
                  : 'border-line bg-surface-elevated text-ink-muted hover:border-brand hover:text-ink'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
              No matching food spots found
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              Try clearing your search or switching to all categories around {userLocation.area}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
