import type { UserLocation } from '@/types/food';

export interface LocationSuggestion {
  id: string;
  primaryText: string;
  secondaryText: string;
  area: string;
  city: string;
  lat: number;
  lng: number;
  kind: 'curated' | 'street';
}

export interface DeliveryCityHub {
  id: string;
  optionLabel: string;
  shortLabel: string;
  area: string;
  city: string;
  streetHint: string;
  lat: number;
  lng: number;
  isSameCityDefault?: boolean;
}

/**
 * Exact 9 Delivery City / Hub options for Cross-City & Local Gift Ordering
 * and Outdoor Event Catering filtering.
 */
export const DELIVERY_CITY_HUBS: DeliveryCityHub[] = [
  {
    id: 'all_same_city',
    optionLabel: 'All Cities (Same-City Local Delivery)',
    shortLabel: 'Same City (Local)',
    area: 'Lekki Phase 1',
    city: 'Lagos',
    streetHint: 'Same-city local neighborhood dispatch',
    lat: 6.4478,
    lng: 3.4723,
    isSameCityDefault: true,
  },
  {
    id: 'hub_asaba',
    optionLabel: 'Asaba (Delta State)',
    shortLabel: 'Asaba, Delta',
    area: 'Asaba GRA & Okpanam',
    city: 'Asaba',
    streetHint: 'Okpanam Rd, Summit Junction & Nnebisi Corridor',
    lat: 6.2059,
    lng: 6.6959,
  },
  {
    id: 'hub_lagos',
    optionLabel: 'Lagos State (Lekki / VI / Ikeja / Yaba)',
    shortLabel: 'Lagos State',
    area: 'Lekki Phase 1',
    city: 'Lagos',
    streetHint: 'Lekki, Victoria Island, Ikeja & Yaba Corridors',
    lat: 6.4478,
    lng: 3.4723,
  },
  {
    id: 'hub_abuja',
    optionLabel: 'Abuja Central (FCT)',
    shortLabel: 'Abuja Central',
    area: 'Abuja Central (Wuse 2 / Maitama)',
    city: 'Abuja',
    streetHint: 'Adetokunbo Ademola, Maitama & Garki',
    lat: 9.0765,
    lng: 7.4756,
  },
  {
    id: 'hub_ph',
    optionLabel: 'Port Harcourt GRA',
    shortLabel: 'Port Harcourt GRA',
    area: 'Port Harcourt GRA',
    city: 'Port Harcourt',
    streetHint: 'New GRA, Tombia St & Peter Odili Rd',
    lat: 4.8242,
    lng: 6.9985,
  },
  {
    id: 'hub_awka',
    optionLabel: 'Awka (Anambra State)',
    shortLabel: 'Awka, Anambra',
    area: 'Awka Central',
    city: 'Awka',
    streetHint: 'Ngozika Estate, Aroma Junction & Unizik',
    lat: 6.2105,
    lng: 7.0723,
  },
  {
    id: 'hub_onitsha',
    optionLabel: 'Onitsha Commercial Hub',
    shortLabel: 'Onitsha Hub',
    area: 'Onitsha GRA & Commercial Hub',
    city: 'Onitsha',
    streetHint: 'Onitsha GRA, Awka Rd & Bridgehead Corridor',
    lat: 6.1498,
    lng: 6.7857,
  },
  {
    id: 'hub_warri',
    optionLabel: 'Warri (Delta State)',
    shortLabel: 'Warri, Delta',
    area: 'Warri & Effurun',
    city: 'Warri',
    streetHint: 'Effurun GRA, Airport Rd & Refinery Rd',
    lat: 5.5544,
    lng: 5.7932,
  },
  {
    id: 'hub_uyo',
    optionLabel: 'Uyo (Akwa Ibom State)',
    shortLabel: 'Uyo, Akwa Ibom',
    area: 'Uyo (Ewet Housing)',
    city: 'Uyo',
    streetHint: 'Ewet Housing Estate, Oron Rd & Shelter Afrique',
    lat: 5.0377,
    lng: 7.9128,
  },
];

/**
 * Rich built-in directory of neighborhoods, corridors, and landmarks so
 * keystrokes return instant (<1ms) suggestions even before network geocoding.
 */
export const CURATED_LOCATIONS: LocationSuggestion[] = [
  // Ikeja & Environs
  {
    id: 'ng_ikeja_gra',
    primaryText: 'Ikeja GRA',
    secondaryText: 'Isaac John St & Joel Ogunnaike, Lagos',
    area: 'Ikeja GRA',
    city: 'Lagos',
    lat: 6.5818,
    lng: 3.3568,
    kind: 'curated',
  },
  {
    id: 'ng_ikeja_allen',
    primaryText: 'Allen Avenue, Ikeja',
    secondaryText: 'Obafemi Awolowo Way & Toyin St, Lagos',
    area: 'Allen Avenue, Ikeja',
    city: 'Lagos',
    lat: 6.6018,
    lng: 3.3515,
    kind: 'curated',
  },
  {
    id: 'ng_ikeja_opebi',
    primaryText: 'Opebi, Ikeja',
    secondaryText: 'Opebi Road & Salvation Bus Stop, Lagos',
    area: 'Opebi, Ikeja',
    city: 'Lagos',
    lat: 6.5936,
    lng: 3.3621,
    kind: 'curated',
  },
  {
    id: 'ng_ikeja_alausa',
    primaryText: 'Alausa, Ikeja',
    secondaryText: 'Secretariat & Ikeja City Mall Corridor, Lagos',
    area: 'Alausa, Ikeja',
    city: 'Lagos',
    lat: 6.6143,
    lng: 3.3581,
    kind: 'curated',
  },
  {
    id: 'ng_ikeja_adeniyi',
    primaryText: 'Adeniyi Jones, Ikeja',
    secondaryText: 'Aromire Ave & Oba Akran, Lagos',
    area: 'Adeniyi Jones, Ikeja',
    city: 'Lagos',
    lat: 6.6112,
    lng: 3.3442,
    kind: 'curated',
  },
  {
    id: 'ng_ikeja_maryland',
    primaryText: 'Maryland, Ikeja',
    secondaryText: 'Ikorodu Rd & Mende Estate, Lagos',
    area: 'Maryland, Ikeja',
    city: 'Lagos',
    lat: 6.5715,
    lng: 3.3679,
    kind: 'curated',
  },

  // Lekki / Victoria Island / Ikoyi
  {
    id: 'ng_lekki_1',
    primaryText: 'Lekki Phase 1',
    secondaryText: 'Admiralty Way & Fola Osibo, Lagos',
    area: 'Lekki Phase 1',
    city: 'Lagos',
    lat: 6.4478,
    lng: 3.4723,
    kind: 'curated',
  },
  {
    id: 'ng_lekki_ikate',
    primaryText: 'Ikate Elegushi, Lekki',
    secondaryText: 'Kushenla Rd & Lekki-Epe Expy, Lagos',
    area: 'Ikate, Lekki',
    city: 'Lagos',
    lat: 6.4375,
    lng: 3.5018,
    kind: 'curated',
  },
  {
    id: 'ng_lekki_chevron',
    primaryText: 'Chevron Drive, Lekki',
    secondaryText: 'Orchid Road & Conservation Toll, Lagos',
    area: 'Chevron, Lekki',
    city: 'Lagos',
    lat: 6.4412,
    lng: 3.5364,
    kind: 'curated',
  },
  {
    id: 'ng_lekki_ajah',
    primaryText: 'Ajah & Sangotedo',
    secondaryText: 'Abraham Adesanya & Monastery Rd, Lagos',
    area: 'Ajah, Lekki',
    city: 'Lagos',
    lat: 6.4698,
    lng: 3.5852,
    kind: 'curated',
  },
  {
    id: 'ng_vi_main',
    primaryText: 'Victoria Island',
    secondaryText: 'Adeola Odeku, Akin Adesola & Karimu Kotun, Lagos',
    area: 'Victoria Island',
    city: 'Lagos',
    lat: 6.4281,
    lng: 3.4219,
    kind: 'curated',
  },
  {
    id: 'ng_vi_oniru',
    primaryText: 'Oniru Estate, Victoria Island',
    secondaryText: 'Water Corporation Dr & Landmark Corridor, Lagos',
    area: 'Oniru, VI',
    city: 'Lagos',
    lat: 6.4265,
    lng: 3.4449,
    kind: 'curated',
  },
  {
    id: 'ng_ikoyi_awolowo',
    primaryText: 'Ikoyi',
    secondaryText: 'Awolowo Rd, Bourdillon & Glover Rd, Lagos',
    area: 'Ikoyi',
    city: 'Lagos',
    lat: 6.4549,
    lng: 3.4346,
    kind: 'curated',
  },
  {
    id: 'ng_banana_island',
    primaryText: 'Banana Island, Ikoyi',
    secondaryText: '1st Avenue & Chisco Roundabout, Lagos',
    area: 'Banana Island',
    city: 'Lagos',
    lat: 6.4648,
    lng: 3.4519,
    kind: 'curated',
  },

  // Mainland Hubs
  {
    id: 'ng_yaba_main',
    primaryText: 'Yaba & Akoka',
    secondaryText: 'Herbert Macaulay Way, Sabo & UNILAG, Lagos',
    area: 'Yaba & Akoka',
    city: 'Lagos',
    lat: 6.5158,
    lng: 3.3781,
    kind: 'curated',
  },
  {
    id: 'ng_surulere_bode',
    primaryText: 'Surulere',
    secondaryText: 'Bode Thomas, Adeniran Ogunsanya & Ogunlana Dr, Lagos',
    area: 'Surulere',
    city: 'Lagos',
    lat: 6.4983,
    lng: 3.3539,
    kind: 'curated',
  },
  {
    id: 'ng_gbagada',
    primaryText: 'Gbagada',
    secondaryText: 'Diya St, Ifako & Gbagada Phase 2, Lagos',
    area: 'Gbagada',
    city: 'Lagos',
    lat: 6.5569,
    lng: 3.3863,
    kind: 'curated',
  },
  {
    id: 'ng_magodo',
    primaryText: 'Magodo Phase 2',
    secondaryText: 'CMD Road & Shangisha, Lagos',
    area: 'Magodo Phase 2',
    city: 'Lagos',
    lat: 6.6194,
    lng: 3.3789,
    kind: 'curated',
  },
  {
    id: 'ng_ogudu',
    primaryText: 'Ogudu GRA',
    secondaryText: 'Ogudu Road & Ojota Corridor, Lagos',
    area: 'Ogudu GRA',
    city: 'Lagos',
    lat: 6.5762,
    lng: 3.3918,
    kind: 'curated',
  },
  {
    id: 'ng_festac',
    primaryText: 'Festac Town',
    secondaryText: '21 Road, 23 Road & Amuwo Odofin, Lagos',
    area: 'Festac Town',
    city: 'Lagos',
    lat: 6.4664,
    lng: 3.2835,
    kind: 'curated',
  },
  {
    id: 'ng_egbeda',
    primaryText: 'Egbeda & Akowonjo',
    secondaryText: 'Shasha Road & Gowon Estate, Lagos',
    area: 'Egbeda',
    city: 'Lagos',
    lat: 6.5973,
    lng: 3.2918,
    kind: 'curated',
  },

  // Abuja / Port Harcourt / Ibadan
  {
    id: 'ng_abuja_wuse2',
    primaryText: 'Wuse 2, Abuja',
    secondaryText: 'Adetokunbo Ademola Cres & Aminu Kano, FCT',
    area: 'Wuse 2',
    city: 'Abuja',
    lat: 9.0765,
    lng: 7.4756,
    kind: 'curated',
  },
  {
    id: 'ng_abuja_maitama',
    primaryText: 'Maitama, Abuja',
    secondaryText: 'Aguiyi Ironsi St & Gana St, FCT',
    area: 'Maitama',
    city: 'Abuja',
    lat: 9.0882,
    lng: 7.4934,
    kind: 'curated',
  },
  {
    id: 'ng_ibadan_bodija',
    primaryText: 'Bodija, Ibadan',
    secondaryText: 'Awolowo Ave & UI Corridor, Oyo',
    area: 'Bodija',
    city: 'Ibadan',
    lat: 7.4208,
    lng: 3.9098,
    kind: 'curated',
  },
  {
    id: 'ng_ph_gra',
    primaryText: 'New GRA, Port Harcourt',
    secondaryText: 'Tombia St & Sani Abacha Rd, Rivers',
    area: 'Port Harcourt GRA',
    city: 'Port Harcourt',
    lat: 4.8242,
    lng: 6.9985,
    kind: 'curated',
  },
  {
    id: 'ng_asaba_okpanam',
    primaryText: 'Asaba (Okpanam & GRA)',
    secondaryText: 'Okpanam Rd, Summit Junction & Nnebisi, Delta State',
    area: 'Asaba GRA & Okpanam',
    city: 'Asaba',
    lat: 6.2059,
    lng: 6.6959,
    kind: 'curated',
  },
  {
    id: 'ng_awka_ngozika',
    primaryText: 'Awka (Aroma & Ngozika Estate)',
    secondaryText: 'Enugu-Onitsha Expy & Unizik Corridor, Anambra State',
    area: 'Awka Central',
    city: 'Awka',
    lat: 6.2105,
    lng: 7.0723,
    kind: 'curated',
  },
  {
    id: 'ng_onitsha_hub',
    primaryText: 'Onitsha Commercial Hub & GRA',
    secondaryText: 'Onitsha GRA, Awka Rd & Main Market, Anambra State',
    area: 'Onitsha Hub',
    city: 'Onitsha',
    lat: 6.1498,
    lng: 6.7857,
    kind: 'curated',
  },
  {
    id: 'ng_warri_effurun',
    primaryText: 'Warri & Effurun GRA',
    secondaryText: 'Airport Rd & Refinery Rd Corridor, Delta State',
    area: 'Warri & Effurun',
    city: 'Warri',
    lat: 5.5544,
    lng: 5.7932,
    kind: 'curated',
  },
  {
    id: 'ng_uyo_ewet',
    primaryText: 'Uyo (Ewet Housing & Shelter Afrique)',
    secondaryText: 'Oron Rd & Abak Rd, Akwa Ibom State',
    area: 'Uyo (Ewet Housing)',
    city: 'Uyo',
    lat: 5.0377,
    lng: 7.9128,
    kind: 'curated',
  },
];

/** Instant synchronous filter against our curated neighborhood & street catalog */
export function filterLocalSuggestions(query: string, limit = 6): LocationSuggestion[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return CURATED_LOCATIONS.slice(0, 5);
  }

  const scored = CURATED_LOCATIONS.map((item) => {
    const primary = item.primaryText.toLowerCase();
    const secondary = item.secondaryText.toLowerCase();
    let score = 0;

    if (primary.startsWith(q)) score += 100;
    else if (primary.includes(q)) score += 70;
    else if (secondary.includes(q)) score += 40;

    // Token match support (e.g. "isaac ikeja")
    const tokens = q.split(/\s+/).filter(Boolean);
    if (
      score === 0 &&
      tokens.length > 1 &&
      tokens.every((t) => primary.includes(t) || secondary.includes(t))
    ) {
      score += 55;
    }

    return { item, score };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.item);
}

interface NominatimHit {
  place_id: number;
  name?: string;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    suburb?: string;
    neighbourhood?: string;
    city?: string;
    state?: string;
    road?: string;
  };
}

/**
 * Live street-level geocoding lookup across Nigeria (OpenStreetMap Nominatim)
 * merged seamlessly below instant local matches.
 */
export async function fetchStreetSuggestions(
  query: string,
  signal?: AbortSignal,
): Promise<LocationSuggestion[]> {
  const trimmed = query.trim();
  if (trimmed.length < 3) return [];

  try {
    const params = new URLSearchParams({
      q: trimmed,
      format: 'jsonv2',
      addressdetails: '1',
      countrycodes: 'ng',
      limit: '4',
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      {
        signal,
        headers: { Accept: 'application/json' },
      },
    );

    if (!response.ok) return [];
    const results = (await response.json()) as NominatimHit[];

    return results.map((hit) => {
      const parts = hit.display_name.split(',').map((p) => p.trim());
      const primary = hit.name || hit.address?.road || parts[0] || trimmed;
      const secondary = parts.slice(1, 4).join(', ') || 'Nigeria';
      const area =
        hit.address?.suburb ||
        hit.address?.neighbourhood ||
        parts[1] ||
        primary;
      const city = hit.address?.city || hit.address?.state || 'Lagos';

      return {
        id: `osm_${hit.place_id}`,
        primaryText: primary,
        secondaryText: secondary,
        area,
        city,
        lat: Number(hit.lat),
        lng: Number(hit.lon),
        kind: 'street',
      };
    });
  } catch {
    // Graceful no-op when offline or aborted
    return [];
  }
}

export function suggestionToUserLocation(suggestion: LocationSuggestion): UserLocation {
  return {
    id: suggestion.id,
    area: suggestion.area,
    city: suggestion.city,
    streetHint: `${suggestion.primaryText} · ${suggestion.secondaryText}`,
    lat: suggestion.lat,
    lng: suggestion.lng,
    source: 'manual',
  };
}
