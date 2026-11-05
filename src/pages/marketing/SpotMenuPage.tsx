import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Bike, Clock, Flame, MapPin, Plus, Star } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useSpotDetail } from '@/hooks/useFoodDiscovery';
import { formatNgn } from '@/services/food.service';
import { useAppStore } from '@/store/useAppStore';

export function SpotMenuPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { userLocation, addToCart } = useAppStore();

  const { data: spot, isLoading, isError, error } = useSpotDetail(
    slug,
    userLocation.lat,
    userLocation.lng,
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm font-bold text-ink-muted">
        Loading kitchen menu...
      </div>
    );
  }

  if (isError || !spot) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-display text-xl font-extrabold text-ink">
          {error instanceof Error ? error.message : 'Kitchen not found'}
        </p>
        <Link
          to={ROUTES.EXPLORE}
          className="mt-4 inline-flex items-center gap-2 rounded-control bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to nearby spots</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-3 py-7 sm:px-6 sm:py-10 lg:px-8">
      <Link
        to={ROUTES.EXPLORE}
        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-ink-muted hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>All spots near {userLocation.area}</span>
      </Link>

      {/* Storefront Hero Banner */}
      <div className="mt-4 overflow-hidden rounded-card border border-line bg-surface-elevated shadow-soft">
        <div className="relative min-h-[14.5rem] sm:h-72">
          <img
            src={spot.coverImage}
            alt={spot.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-inverse/90 via-surface-inverse/35 to-transparent" />
          <div className="relative flex min-h-[14.5rem] flex-col justify-end p-4 text-ink-inverse sm:h-72 sm:flex-row sm:items-end sm:justify-between sm:p-6">
            <div>
              {spot.promoBadge && (
                <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-brand-foreground">
                  {spot.promoBadge}
                </span>
              )}
              <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-4xl">
                {spot.name}
              </h1>
              <p className="mt-1 text-xs text-ink-inverse/85 sm:text-sm">{spot.tagline}</p>
            </div>

            <div className="mt-3 inline-flex self-start items-center gap-2 rounded-full bg-surface-elevated px-3.5 py-1.5 text-xs font-extrabold text-ink sm:mt-0 sm:self-auto">
              <Star className="h-4 w-4 fill-brand text-brand" />
              <span>{spot.rating.toFixed(1)}</span>
              <span className="text-ink-subtle">({spot.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Logistics Strip */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3.5 text-xs font-bold text-ink-muted sm:gap-6 sm:px-6 sm:py-4 sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0 text-brand" />
            {spot.distanceKm} km from {userLocation.area}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 shrink-0 text-brand" />
            {spot.etaMin}–{spot.etaMax} mins delivery
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bike className="h-4 w-4 shrink-0 text-brand" />
            {spot.deliveryFeeNgn === 0 ? 'Free Delivery' : `${formatNgn(spot.deliveryFeeNgn)} rider fee`}
          </span>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="mt-8 sm:mt-10">
        <h2 className="font-display text-lg font-extrabold text-ink sm:text-xl">
          Menu · Ready for Fast Dispatch
        </h2>
        <div className="mt-4 grid gap-3.5 sm:mt-5 sm:gap-4 md:grid-cols-2">
          {spot.menu.map((dish) => (
            <div
              key={dish.id}
              className="flex justify-between gap-3 rounded-card border border-line bg-surface-elevated p-3.5 shadow-sm transition hover:border-brand/50 sm:gap-4 sm:p-4"
            >
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h3 className="font-display text-sm font-extrabold text-ink sm:text-base">
                      {dish.name}
                    </h3>
                    {dish.spicy && (
                      <Flame className="h-3.5 w-3.5 shrink-0 text-brand" aria-label="Spicy" />
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                    {dish.description}
                  </p>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-sm font-extrabold text-ink">
                    {formatNgn(dish.priceNgn)}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        spotId: spot.id,
                        spotSlug: spot.slug,
                        spotName: spot.name,
                        deliveryFeeNgn: spot.deliveryFeeNgn,
                        item: dish,
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-extrabold text-brand-foreground transition hover:bg-brand-hover sm:px-3.5"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <img
                src={dish.imageUrl}
                alt={dish.name}
                className="h-20 w-20 shrink-0 rounded-control object-cover sm:h-24 sm:w-24"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
