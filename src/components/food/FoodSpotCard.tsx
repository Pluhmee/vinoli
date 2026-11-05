import { Link } from 'react-router-dom';
import { Bike, Clock, MapPin, Plus, Star } from 'lucide-react';
import { buildSpotUrl } from '@/config/routes';
import { formatNgn } from '@/services/food.service';
import { useAppStore } from '@/store/useAppStore';
import type { FoodSpot } from '@/types/food';

export function FoodSpotCard({ spot }: { spot: FoodSpot }) {
  const addToCart = useAppStore((s) => s.addToCart);
  const featuredDish = spot.menu[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface-elevated shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-elevated">
      {/* Cover Image + Floating Badges */}
      <Link to={buildSpotUrl(spot.slug)} className="relative block aspect-[16/10] overflow-hidden bg-surface-muted">
        <img
          src={spot.coverImage}
          alt={spot.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/65 via-transparent to-transparent" />

        {/* Top Left Promo Pill */}
        {spot.promoBadge && (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-foreground shadow-sm">
            {spot.promoBadge}
          </span>
        )}

        {/* Top Right Rating Pill */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-extrabold text-[#2A054D] shadow-sm backdrop-blur-sm dark:bg-[#1B0432]/95 dark:text-[#FDF9ED] dark:ring-1 dark:ring-white/15">
          <Star className="h-3.5 w-3.5 fill-[#FC7B0F] text-[#FC7B0F]" />
          <span>{spot.rating.toFixed(1)}</span>
          <span className="font-medium text-[#604778] dark:text-[#CEBFDE]">
            ({spot.reviewCount})
          </span>
        </span>

        {/* Bottom Overlay: Distance & ETA */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-xs font-bold">
          <span className="inline-flex min-w-0 items-center gap-1.5 truncate rounded-full bg-[#140226]/90 px-3 py-1 text-white shadow-sm ring-1 ring-white/15 backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#FC7B0F]" />
            <span className="truncate">
              {spot.distanceKm} km · {spot.area}
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[#2A054D] shadow-sm backdrop-blur-sm dark:bg-[#1B0432]/95 dark:text-[#FDF9ED] dark:ring-1 dark:ring-white/15">
            <Clock className="h-3 w-3 text-[#FC7B0F]" />
            {spot.etaMin}–{spot.etaMax} min
          </span>
        </div>
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              to={buildSpotUrl(spot.slug)}
              className="font-display text-lg font-extrabold tracking-tight text-ink transition group-hover:text-brand"
            >
              {spot.name}
            </Link>
          </div>

          <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{spot.tagline}</p>

          {/* Cuisine Chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {spot.cuisineTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-plum-soft px-2.5 py-0.5 text-[11px] font-semibold text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Delivery Fee + Quick Add Popular Dish */}
        <div className="mt-4 border-t border-line pt-3.5">
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Bike className="h-3.5 w-3.5 text-brand" />
              {spot.deliveryFeeNgn === 0 ? (
                <strong className="text-brand">Free delivery</strong>
              ) : (
                <span>{formatNgn(spot.deliveryFeeNgn)} delivery</span>
              )}
            </span>
            <Link
              to={buildSpotUrl(spot.slug)}
              className="font-bold text-ink hover:text-brand"
            >
              Full menu →
            </Link>
          </div>

          {featuredDish && (
            <button
              type="button"
              onClick={() =>
                addToCart({
                  spotId: spot.id,
                  spotSlug: spot.slug,
                  spotName: spot.name,
                  deliveryFeeNgn: spot.deliveryFeeNgn,
                  item: featuredDish,
                })
              }
              className="mt-3 flex w-full items-center justify-between gap-2 rounded-control border border-line bg-surface px-3 py-2 text-left text-xs transition hover:border-brand hover:bg-brand-soft/40"
            >
              <span className="truncate font-semibold text-ink">
                <span className="text-brand">Popular:</span> {featuredDish.name}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 font-mono font-bold text-ink">
                {formatNgn(featuredDish.priceNgn)}
                <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand text-brand-foreground">
                  <Plus className="h-3 w-3" />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
