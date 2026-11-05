import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ArrowRight,
  CheckCircle2,
  LocateFixed,
  MapPin,
  Navigation,
  Star,
  X,
} from 'lucide-react';
import {
  fetchStreetSuggestions,
  filterLocalSuggestions,
  type LocationSuggestion,
  suggestionToUserLocation,
} from '@/services/location.service';
import { PRESET_LOCATIONS, useAppStore } from '@/store/useAppStore';

interface HeroSectionProps {
  onLocationSelected?: () => void;
}

/** Custom warm Vinoli location-radar badge icon */
function NearbyPulseBadge() {
  return (
    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFE8CC] text-[#EB5605] sm:h-10 sm:w-10">
      <span className="absolute h-5 w-5 animate-ping rounded-full bg-[#FC7B0F]/25 sm:h-6 sm:w-6" />
      <MapPin className="relative h-4 w-4 stroke-[2.4] sm:h-5 sm:w-5" />
    </div>
  );
}

/** Highlights the matching query substring in Vinoli Tangerine */
function HighlightedMatch({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;

  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <>{text}</>;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);

  return (
    <>
      {before}
      <span className="text-[#EB5605] dark:text-[#FC7B0F]">{match}</span>
      {after}
    </>
  );
}

export function HeroSection({ onLocationSelected }: HeroSectionProps) {
  const {
    userLocation,
    isLocating,
    locationNotice,
    setManualAddress,
    setPresetLocation,
    setResolvedLocation,
    detectCurrentLocation,
  } = useAppStore();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [addressInput, setAddressInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [remoteSuggestions, setRemoteSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearchingStreets, setIsSearchingStreets] = useState(false);

  // 1. Instant 0ms curated matches
  const localSuggestions = useMemo(
    () => filterLocalSuggestions(addressInput, 5),
    [addressInput],
  );

  // 2. Merge instant local matches + live geocoded Nigerian streets (deduped)
  const suggestions = useMemo(() => {
    const seen = new Set(localSuggestions.map((s) => s.primaryText.toLowerCase()));
    const merged = [...localSuggestions];
    for (const remote of remoteSuggestions) {
      const key = remote.primaryText.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(remote);
      }
    }
    return merged.slice(0, 7);
  }, [localSuggestions, remoteSuggestions]);

  // Debounced live street lookup when typing 3+ characters
  useEffect(() => {
    const trimmed = addressInput.trim();
    if (trimmed.length < 3) {
      setRemoteSuggestions([]);
      setIsSearchingStreets(false);
      return;
    }

    const controller = new AbortController();
    setIsSearchingStreets(true);

    const timer = window.setTimeout(async () => {
      const hits = await fetchStreetSuggestions(trimmed, controller.signal);
      if (!controller.signal.aborted) {
        setRemoteSuggestions(hits);
        setIsSearchingStreets(false);
      }
    }, 260);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [addressInput]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectSuggestion = (suggestion: LocationSuggestion) => {
    setResolvedLocation(suggestionToUserLocation(suggestion));
    setAddressInput(suggestion.primaryText);
    setIsDropdownOpen(false);
    inputRef.current?.blur();
    onLocationSelected?.();
  };

  const handleAddressSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isDropdownOpen && suggestions[activeIndex] && addressInput.trim()) {
      selectSuggestion(suggestions[activeIndex]);
      return;
    }
    if (addressInput.trim()) {
      setManualAddress(addressInput);
    }
    setIsDropdownOpen(false);
    onLocationSelected?.();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsDropdownOpen(true);
      return;
    }
    if (!isDropdownOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (suggestions.length ? (prev + 1) % suggestions.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) =>
        suggestions.length ? (prev - 1 + suggestions.length) % suggestions.length : 0,
      );
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  const handleGpsClick = async () => {
    setIsDropdownOpen(false);
    await detectCurrentLocation();
    setAddressInput('');
    onLocationSelected?.();
  };

  return (
    <section className="mx-auto max-w-7xl px-3 pt-2 pb-5 sm:px-6 sm:pt-3 sm:pb-6 lg:px-8">
      <div className="relative rounded-[1.5rem] px-4 py-8 shadow-soft sm:rounded-[2.25rem] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        {/* Clipped Background + Decorative Arcs Layer (kept separate so dropdown never clips!) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#FDE3B0] via-[#FBD38D] to-[#F7C36F] dark:from-[#270649] dark:via-[#1E0438] dark:to-[#150229] dark:ring-1 dark:ring-white/10 sm:rounded-[2.25rem]"
        >
          <svg
            viewBox="0 0 360 360"
            fill="none"
            className="absolute -bottom-16 -right-16 h-64 w-64 text-[#D97706]/25 dark:text-[#FC7B0F]/15 sm:h-80 sm:w-80"
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <circle
                key={i}
                cx="300"
                cy="300"
                r={70 + i * 12}
                stroke="currentColor"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 grid items-center gap-9 sm:gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ===============================================================
              LEFT COLUMN — Vinoli Poster Headline + Autocomplete Location Bar
          =============================================================== */}
          <div className="lg:col-span-6">
            <h1
              style={{ fontFamily: "'Poppins', var(--font-display)" }}
              className="text-[1.95rem] font-black uppercase leading-[1.03] tracking-[-0.025em] text-[#2A054D] dark:text-[#FDF9ED] min-[380px]:text-[2.35rem] sm:text-[3.25rem] lg:text-[3.3rem] xl:text-[3.8rem]"
            >
              <span className="block">GREAT FOOD</span>
              <span className="block">AROUND YOU,</span>
              <span className="block text-[#EB5605] dark:text-[#FC7B0F]">
                MADE EASY.
              </span>
            </h1>

            <p className="mt-4 max-w-[27rem] text-sm font-medium leading-relaxed text-[#3E1B61]/85 dark:text-[#FDF9ED]/80 sm:mt-5 sm:text-base">
              Pinpoint your location or type your street — Vinoli finds top kitchens and
              local spots near you so you can order hot meals in taps.
            </p>

            {/* Location Bar + Live Autocomplete Dropdown Wrapper */}
            <div ref={containerRef} className="relative z-40 mt-6 max-w-[31rem] sm:mt-8">
              <form
                onSubmit={handleAddressSubmit}
                className="flex h-12 items-center gap-1.5 rounded-full bg-white pl-3.5 pr-1.5 shadow-[0_10px_28px_rgba(42,5,77,0.10)] ring-1 ring-[#2A054D]/5 focus-within:ring-2 focus-within:ring-[#FC7B0F] dark:bg-[#140226] dark:ring-white/15 sm:h-14 sm:gap-2 sm:pl-5 sm:pr-2"
              >
                <MapPin className="h-4 w-4 shrink-0 text-[#FC7B0F] sm:h-5 sm:w-5" />

                <input
                  ref={inputRef}
                  type="text"
                  value={addressInput}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  onFocus={() => setIsDropdownOpen(true)}
                  onChange={(e) => {
                    setAddressInput(e.target.value);
                    setActiveIndex(0);
                    setIsDropdownOpen(true);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={`Enter street or area (${userLocation.area})`}
                  aria-label="Enter delivery street or neighborhood"
                  aria-expanded={isDropdownOpen}
                  aria-autocomplete="list"
                  className="min-w-0 flex-1 bg-transparent text-base font-medium text-[#2A054D] placeholder:text-[#8A759E] focus:outline-none dark:text-[#FDF9ED] dark:placeholder:text-[#9E88B6] sm:text-sm"
                />

                {addressInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setAddressInput('');
                      setActiveIndex(0);
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear location text"
                    className="rounded-full p-1 text-[#8A759E] transition hover:text-[#2A054D] dark:hover:text-[#FDF9ED]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                {/* Inline GPS Auto-Locate Pill */}
                <button
                  type="button"
                  onClick={handleGpsClick}
                  disabled={isLocating}
                  title="Use my current GPS location"
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-[#F4EDDC] px-2.5 text-xs font-extrabold text-[#2A054D] transition hover:bg-[#FFEEDC] hover:text-[#EB5605] disabled:opacity-60 dark:bg-[#260944] dark:text-[#FDF9ED] dark:hover:text-[#FC7B0F] sm:h-9 sm:px-3"
                >
                  <LocateFixed
                    className={`h-3.5 w-3.5 text-[#FC7B0F] ${isLocating ? 'animate-spin' : ''}`}
                  />
                  <span className="hidden min-[400px]:inline">
                    {isLocating ? 'Locating...' : 'Use GPS'}
                  </span>
                </button>

                {/* Circular Submit Action */}
                <button
                  type="submit"
                  aria-label="Find food spots near this location"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2A054D] text-white transition hover:bg-[#FC7B0F] dark:bg-[#FC7B0F] dark:hover:bg-[#FF8E2B] sm:h-10 sm:w-10"
                >
                  <ArrowRight className="h-4 w-4 stroke-[2.6]" />
                </button>
              </form>

              {/* Live Location Suggestions Dropdown */}
              {isDropdownOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-[1.25rem] border border-[#E9E0CD] bg-white p-1.5 shadow-[0_22px_50px_rgba(20,2,38,0.28)] dark:border-[#4A1D75] dark:bg-[#1C0533] sm:mt-2.5 sm:rounded-[1.35rem] sm:p-2"
                >
                  {/* Header label */}
                  <div className="flex items-center justify-between px-3 py-1.5">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8A759E] dark:text-[#A992C2]">
                      {addressInput.trim()
                        ? 'Matching Locations'
                        : 'Popular Delivery Areas'}
                    </span>
                    {isSearchingStreets && (
                      <span className="text-[11px] font-semibold text-[#FC7B0F]">
                        Searching streets...
                      </span>
                    )}
                  </div>

                  {suggestions.length > 0 ? (
                    <ul className="max-h-64 overflow-y-auto overscroll-contain sm:max-h-72">
                      {suggestions.map((item, idx) => {
                        const isHighlighted = idx === activeIndex;
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={isHighlighted}
                              onMouseEnter={() => setActiveIndex(idx)}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                selectSuggestion(item);
                              }}
                              className={`flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition sm:gap-3 sm:px-3 ${
                                isHighlighted
                                  ? 'bg-[#FFF3E6] dark:bg-[#2F0D54]'
                                  : 'hover:bg-[#FAF5EA] dark:hover:bg-[#260944]'
                              }`}
                            >
                              <span
                                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
                                  isHighlighted
                                    ? 'bg-[#FC7B0F] text-white'
                                    : 'bg-[#F4EDDC] text-[#2A054D] dark:bg-[#2A094D] dark:text-[#FC7B0F]'
                                }`}
                              >
                                {item.kind === 'street' ? (
                                  <Navigation className="h-3.5 w-3.5" />
                                ) : (
                                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                )}
                              </span>

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-extrabold text-[#2A054D] dark:text-[#FDF9ED] sm:text-sm">
                                  <HighlightedMatch
                                    text={item.primaryText}
                                    query={addressInput}
                                  />
                                </p>
                                <p className="truncate text-[11px] text-[#604778] dark:text-[#CEBFDE] sm:text-xs">
                                  <HighlightedMatch
                                    text={item.secondaryText}
                                    query={addressInput}
                                  />
                                </p>
                              </div>

                              <span className="mt-1 shrink-0 rounded-full bg-[#F1E9F9] px-2 py-0.5 text-[10px] font-bold text-[#2A054D] dark:bg-[#34105C] dark:text-[#FDF9ED]/85">
                                {item.city}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        if (addressInput.trim()) {
                          setManualAddress(addressInput);
                          setIsDropdownOpen(false);
                          onLocationSelected?.();
                        }
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-bold text-[#2A054D] hover:bg-[#FFF3E6] dark:text-[#FDF9ED] dark:hover:bg-[#2F0D54]"
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-[#FC7B0F]" />
                      <span className="truncate">
                        Pin delivery to “<strong>{addressInput.trim()}</strong>”
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Minimal quick-zone switcher + GPS confirmation */}
            <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pl-1 text-xs sm:gap-x-3 sm:pl-2">
              <span className="font-bold text-[#3E1B61]/70 dark:text-[#FDF9ED]/60">
                Nearby zones:
              </span>
              {PRESET_LOCATIONS.slice(0, 4).map((loc) => {
                const isCurrent = userLocation.area === loc.area;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      setPresetLocation(loc.id);
                      onLocationSelected?.();
                    }}
                    className={`font-extrabold transition ${
                      isCurrent
                        ? 'text-[#EB5605] underline underline-offset-4 dark:text-[#FC7B0F]'
                        : 'text-[#2A054D]/80 hover:text-[#EB5605] dark:text-[#FDF9ED]/80 dark:hover:text-[#FC7B0F]'
                    }`}
                  >
                    {loc.area}
                  </button>
                );
              })}
            </div>

            {locationNotice && (
              <p className="mt-2.5 inline-flex items-center gap-1.5 pl-1 text-xs font-extrabold text-[#2A054D] dark:text-[#FC7B0F] sm:pl-2">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#EB5605] dark:text-[#FC7B0F]" />
                <span>{locationNotice}</span>
              </p>
            )}
          </div>

          {/* ===============================================================
              RIGHT COLUMN — 5-Bowl Overhead Circular Collage + Location Cards
          =============================================================== */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto aspect-[1.06/1] w-full max-w-[380px] sm:max-w-[460px] lg:max-w-[490px]">
              {/* Top-Left Floating Nearby Dish Card */}
              <div className="absolute left-0 top-[1%] z-30 flex max-w-[54%] items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-[0_12px_28px_rgba(42,5,77,0.14)] sm:left-[1%] sm:top-[2%] sm:max-w-none sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-2.5">
                <img
                  src="/images/plate-jollof.jpg"
                  alt="Smoky Party Jollof"
                  className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-11 sm:w-11"
                />
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-extrabold text-[#2A054D] sm:max-w-[8.5rem] sm:text-xs">
                    Smoky Jollof Bowl
                  </p>
                  <p className="mt-0.5 truncate text-[10px] font-bold text-[#EB5605] sm:text-[11px]">
                    0.8 km away · 14m
                  </p>
                  <p className="mt-0.5 text-[11px] font-extrabold text-[#2A054D] sm:text-xs">
                    ₦6,800
                  </p>
                </div>
              </div>

              {/* 1. Top-Left Plate */}
              <div className="absolute left-[4%] top-[8%] z-10 h-[43%] w-[43%] overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_16px_35px_rgba(42,5,77,0.16)] sm:border-[6px]">
                <img
                  src="/images/plate-friedrice.jpg"
                  alt="Prawn fried rice and plantain"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 2. Top-Right Plate */}
              <div className="absolute right-[2%] top-[0%] z-10 h-[42%] w-[42%] overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_16px_35px_rgba(42,5,77,0.16)] sm:border-[6px]">
                <img
                  src="/images/plate-grill.jpg"
                  alt="Spiced grilled fish"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 3. Center Overlapping Bowl */}
              <div className="absolute left-[50%] top-[49%] z-20 h-[33%] w-[33%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_18px_38px_rgba(42,5,77,0.24)] sm:border-[6px]">
                <img
                  src="/images/plate-swallow.jpg"
                  alt="Pounded yam with egusi and vegetable soup"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 4. Bottom-Left Plate */}
              <div className="absolute bottom-[5%] left-[4%] z-10 h-[44%] w-[44%] overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_16px_35px_rgba(42,5,77,0.16)] sm:border-[6px]">
                <img
                  src="/images/plate-jollof.jpg"
                  alt="Smoky jollof rice and grilled chicken"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 5. Bottom-Right Plate */}
              <div className="absolute bottom-[8%] right-[3%] z-10 h-[41%] w-[41%] overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_16px_35px_rgba(42,5,77,0.16)] sm:border-[6px]">
                <img
                  src="/images/plate-stew.jpg"
                  alt="Peppered meat and plantain stew"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Bottom-Left Live Area Availability Pill */}
              <div className="absolute bottom-0 left-0 z-30 flex max-w-[78%] items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-[0_12px_28px_rgba(42,5,77,0.14)] sm:max-w-none sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-2.5">
                <NearbyPulseBadge />
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-extrabold text-[#2A054D] sm:text-[13px]">
                    Spots near {userLocation.area}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 truncate text-[10px] text-[#604778] sm:text-[11px]">
                    <Star className="h-3 w-3 shrink-0 fill-[#FC7B0F] text-[#FC7B0F] sm:h-3.5 sm:w-3.5" />
                    <strong className="font-extrabold text-[#2A054D]">4.9</strong>
                    <span className="truncate">· Fast local dispatch</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
