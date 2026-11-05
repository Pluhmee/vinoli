import { ENV } from '@/config/env';
import { ApiError, apiClient } from '@/lib/apiClient';
import { useAppStore } from '@/store/useAppStore';
import type {
  CuisineCategory,
  FoodOrder,
  FoodSpot,
  NearbySpotFilters,
  PortalDispatchSummary,
} from '@/types/food';

export const CUISINE_CATEGORIES: Array<{
  id: CuisineCategory;
  label: string;
  emoji: string;
}> = [
  { id: 'all', label: 'All Near You', emoji: '🔥' },
  { id: 'local-dishes', label: 'Jollof & Local', emoji: '🍲' },
  { id: 'burgers-wraps', label: 'Burgers & Shawarma', emoji: '🍔' },
  { id: 'grills-suya', label: 'Suya & Flame Grill', emoji: '🍢' },
  { id: 'fresh-bowls', label: 'Rice & Salad Bowls', emoji: '🥗' },
  { id: 'pastries-drinks', label: 'Pastries & Juices', emoji: '🥐' },
];

type RawSpotSeed = Omit<FoodSpot, 'distanceKm' | 'etaMin' | 'etaMax' | 'deliveryFeeNgn'>;

const SEED_SPOTS: RawSpotSeed[] = [
  {
    id: 'spot_01',
    slug: 'firewood-pot-kitchen',
    name: 'Firewood Pot Kitchen',
    tagline: 'Smoky party jollof, peppered turkey & sweet fried plantain',
    category: 'local-dishes',
    cuisineTags: ['Smoky Jollof', 'Asun Rice', 'Plantain'],
    rating: 4.9,
    reviewCount: 640,
    area: 'Lekki Phase 1',
    lat: 6.4495,
    lng: 3.4755,
    minOrderNgn: 3500,
    isOpen: true,
    promoBadge: 'Free Delivery',
    coverImage: '/images/spot-jollof.jpg',
    menu: [
      {
        id: 'm_fp_1',
        name: 'Smoky Party Jollof & Peppered Turkey',
        description: 'Firewood-infused basmati jollof served with glazed turkey wing, sweet dodo & creamy coleslaw.',
        priceNgn: 6800,
        prepMins: 12,
        popular: true,
        spicy: true,
        imageUrl: '/images/spot-jollof.jpg',
      },
      {
        id: 'm_fp_2',
        name: 'Asun Native Rice Bowl',
        description: 'Spicy smoked goat meat tossed in native palm-oil rice with scent leaf and plantain cubes.',
        priceNgn: 7400,
        prepMins: 15,
        popular: true,
        spicy: true,
        imageUrl: '/images/hero-feast.jpg',
      },
      {
        id: 'm_fp_3',
        name: 'Grilled Croaker & Yam Fries',
        description: 'Whole marinated croaker fillet with crispy yam chips and ata-dindin dipping sauce.',
        priceNgn: 9200,
        prepMins: 18,
        imageUrl: '/images/spot-jollof.jpg',
      },
    ],
  },
  {
    id: 'spot_02',
    slug: 'smash-avenue-burgers',
    name: 'Smash Avenue',
    tagline: 'Crispy-edge double smash burgers, loaded fries & cold shakes',
    category: 'burgers-wraps',
    cuisineTags: ['Smash Burgers', 'Loaded Fries', 'Wings'],
    rating: 4.8,
    reviewCount: 418,
    area: 'Victoria Island',
    lat: 6.4312,
    lng: 3.4264,
    minOrderNgn: 4500,
    isOpen: true,
    promoBadge: '15% Off Combos',
    coverImage: '/images/spot-burger.jpg',
    menu: [
      {
        id: 'm_sa_1',
        name: 'Double Cheddar Brioche Smash + Fries',
        description: 'Two seared beef patties, aged American cheddar, house tangy relish, caramelized onions & crinkle fries.',
        priceNgn: 8500,
        prepMins: 14,
        popular: true,
        imageUrl: '/images/spot-burger.jpg',
      },
      {
        id: 'm_sa_2',
        name: 'Honey-Suya Crispy Chicken Burger',
        description: 'Buttermilk crunchy chicken thigh glazed in warm suya-honey butter with slaw on toasted brioche.',
        priceNgn: 7900,
        prepMins: 14,
        spicy: true,
        imageUrl: '/images/spot-burger.jpg',
      },
    ],
  },
  {
    id: 'spot_03',
    slug: 'habibi-wraps-and-grill',
    name: 'Habibi Wraps & Grill',
    tagline: 'Charcoal-seared chicken shawarma, Lebanese platters & falafel bowls',
    category: 'burgers-wraps',
    cuisineTags: ['Shawarma', 'Grill Platters', 'Hummus'],
    rating: 4.9,
    reviewCount: 529,
    area: 'Ikeja GRA',
    lat: 6.5795,
    lng: 3.3541,
    minOrderNgn: 3000,
    isOpen: true,
    promoBadge: 'Fastest Prep',
    coverImage: '/images/spot-shawarma.jpg',
    menu: [
      {
        id: 'm_hw_1',
        name: 'Loaded Double Chicken Shawarma',
        description: 'Flame-roasted marinated chicken strips, toum garlic whip, pickled cucumbers & spicy harissa in toasted saj bread.',
        priceNgn: 5200,
        prepMins: 10,
        popular: true,
        spicy: true,
        imageUrl: '/images/spot-shawarma.jpg',
      },
      {
        id: 'm_hw_2',
        name: 'Mediterranean Grain & Avocado Platter',
        description: 'Saffron rice, grilled herb chicken skewers, sliced avocado, charred corn & tahini drizzle.',
        priceNgn: 7600,
        prepMins: 13,
        popular: true,
        imageUrl: '/images/spot-shawarma.jpg',
      },
    ],
  },
  {
    id: 'spot_04',
    slug: 'danfo-suya-and-smoke',
    name: 'Ember & Yaji Suya Club',
    tagline: 'Hot yaji beef suya, ram skewers, masa & chilled zobo',
    category: 'grills-suya',
    cuisineTags: ['Beef Suya', 'Chicken Skewers', 'Zobo'],
    rating: 4.7,
    reviewCount: 312,
    area: 'Yaba & Akoka',
    lat: 6.5134,
    lng: 3.3762,
    minOrderNgn: 2500,
    isOpen: true,
    coverImage: '/images/hero-feast.jpg',
    menu: [
      {
        id: 'm_ey_1',
        name: 'Pitmaster Mixed Suya Box',
        description: 'Tender sirloin suya + spiced gizzard skewers tossed with roasted peanut yaji, red onions & fresh tomatoes.',
        priceNgn: 6200,
        prepMins: 11,
        popular: true,
        spicy: true,
        imageUrl: '/images/hero-feast.jpg',
      },
      {
        id: 'm_ey_2',
        name: 'Hibiscus Ginger Zobo (500ml)',
        description: 'Cold-pressed hibiscus flower drink infused with fresh pineapple, clove & ginger.',
        priceNgn: 1800,
        prepMins: 3,
        imageUrl: '/images/hero-feast.jpg',
      },
    ],
  },
  {
    id: 'spot_05',
    slug: 'verde-harvest-bowls',
    name: 'Verde Harvest Kitchen',
    tagline: 'Protein rice bowls, mango-avocado salads & cold-pressed juices',
    category: 'fresh-bowls',
    cuisineTags: ['Healthy Bowls', 'Salads', 'Smoothies'],
    rating: 4.8,
    reviewCount: 274,
    area: 'Ikoyi',
    lat: 6.4521,
    lng: 3.4319,
    minOrderNgn: 4000,
    isOpen: true,
    promoBadge: 'Top Rated',
    coverImage: '/images/spot-shawarma.jpg',
    menu: [
      {
        id: 'm_vh_1',
        name: 'Citrus Salmon & Mango Harvest Bowl',
        description: 'Seared Atlantic salmon, jasmine brown rice, ripe mango, avocado, edamame & sesame-ginger dressing.',
        priceNgn: 9800,
        prepMins: 12,
        popular: true,
        imageUrl: '/images/spot-shawarma.jpg',
      },
      {
        id: 'm_vh_2',
        name: 'Chargrilled Harissa Chicken Salad',
        description: 'Baby greens, harissa chicken breast, sweet potato cubes, feta crumble & honey-lime vinaigrette.',
        priceNgn: 7200,
        prepMins: 10,
        imageUrl: '/images/hero-feast.jpg',
      },
    ],
  },
  {
    id: 'spot_06',
    slug: 'bode-thomas-buka-express',
    name: 'Mama Kemi Modern Buka',
    tagline: 'Steaming amala, ewedu, gbegiri, efo riro & assorted meats',
    category: 'local-dishes',
    cuisineTags: ['Amala & Ewedu', 'Ofada Rice', 'Efo Riro'],
    rating: 4.9,
    reviewCount: 790,
    area: 'Surulere',
    lat: 6.4962,
    lng: 3.3554,
    minOrderNgn: 3000,
    isOpen: true,
    promoBadge: 'Local Legend',
    coverImage: '/images/spot-jollof.jpg',
    menu: [
      {
        id: 'm_mk_1',
        name: 'Ofada Rice & Designer Ayamase Stew',
        description: 'Unpolished local ofada rice served in leaf wrap with bleached-palm green pepper stew, boiled egg & dodo.',
        priceNgn: 6400,
        prepMins: 10,
        popular: true,
        spicy: true,
        imageUrl: '/images/spot-jollof.jpg',
      },
      {
        id: 'm_mk_2',
        name: 'Hot Amala, Gbegiri & Ewedu Combo',
        description: 'Silky yam-flour amala paired with bean soup, ewedu & two pieces of slow-braised beef.',
        priceNgn: 5500,
        prepMins: 9,
        popular: true,
        imageUrl: '/images/spot-jollof.jpg',
      },
    ],
  },
];

const DEFAULT_DEMO_ORDER: FoodOrder = {
  orderCode: 'VNL-4092',
  spotName: 'Firewood Pot Kitchen',
  spotArea: 'Lekki Phase 1',
  deliveryAddress: 'Admiralty Way & Fola Osibo Corridor, Lekki Phase 1',
  status: 'on_the_way',
  etaMinutes: 14,
  riderName: 'Tunde Balogun',
  riderBikePlate: 'LSR-719-VN',
  riderRating: 4.9,
  items: [
    { name: 'Smoky Party Jollof & Peppered Turkey', quantity: 2, priceNgn: 6800 },
    { name: 'Hibiscus Ginger Zobo (500ml)', quantity: 2, priceNgn: 1800 },
  ],
  subtotalNgn: 17200,
  deliveryFeeNgn: 800,
  totalNgn: 18000,
  placedAtIso: '2026-11-04T11:02:00Z',
  steps: [
    {
      id: 'st_d1',
      title: 'Order confirmed & prepped',
      subtitle: 'Sealed tamper-proof thermal bag at Firewood Pot Kitchen',
      timeLabel: '11:04 AM',
      completed: true,
    },
    {
      id: 'st_d2',
      title: 'Rider picked up & en route',
      subtitle: 'Tunde Balogun is 1.1 km away on Admiralty Way',
      timeLabel: 'Live now',
      completed: true,
      active: true,
    },
    {
      id: 'st_d3',
      title: 'Doorstep handover',
      subtitle: 'Pin code verification on arrival',
      timeLabel: '~14 mins',
      completed: false,
    },
  ],
};

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const rawKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Multiply by 1.25 urban road factor and clamp minimum to 0.5 km
  return Math.max(0.5, Number((rawKm * 1.25).toFixed(1)));
}

function hydrateSpotForLocation(seed: RawSpotSeed, lat: number, lng: number): FoodSpot {
  const distanceKm = haversineKm(lat, lng, seed.lat, seed.lng);
  const etaMin = Math.max(12, Math.round(10 + distanceKm * 2.4));
  const etaMax = etaMin + 8;
  const deliveryFeeNgn =
    seed.promoBadge === 'Free Delivery'
      ? 0
      : Math.min(2200, Math.round((500 + distanceKm * 140) / 100) * 100);

  return {
    ...seed,
    distanceKm,
    etaMin,
    etaMax,
    deliveryFeeNgn,
  };
}

function delay(ms = 180): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const foodService = {
  async listNearbySpots(filters: NearbySpotFilters): Promise<FoodSpot[]> {
    if (!ENV.USE_MOCK_API) {
      return apiClient.get<FoodSpot[]>('/spots/nearby', {
        params: {
          lat: filters.lat,
          lng: filters.lng,
          category: filters.category !== 'all' ? filters.category : undefined,
          search: filters.search,
          onlyOpen: filters.onlyOpen,
        },
      });
    }

    await delay(160);
    return SEED_SPOTS.map((seed) => hydrateSpotForLocation(seed, filters.lat, filters.lng))
      .filter((spot) => {
        if (filters.onlyOpen && !spot.isOpen) return false;
        if (filters.category && filters.category !== 'all' && spot.category !== filters.category) {
          return false;
        }
        if (filters.search?.trim()) {
          const q = filters.search.trim().toLowerCase();
          const menuNames = spot.menu.map((m) => m.name).join(' ');
          const haystack =
            `${spot.name} ${spot.tagline} ${spot.area} ${spot.cuisineTags.join(' ')} ${menuNames}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  },

  async getSpotBySlug(slug: string, lat: number, lng: number): Promise<FoodSpot> {
    if (!ENV.USE_MOCK_API) {
      return apiClient.get<FoodSpot>(`/spots/${encodeURIComponent(slug)}`, {
        params: { lat, lng },
      });
    }

    await delay(150);
    const found = SEED_SPOTS.find((s) => s.slug === slug);
    if (!found) {
      throw new ApiError(`Kitchen "${slug}" was not found near you.`, 404, 'SPOT_NOT_FOUND');
    }
    return hydrateSpotForLocation(found, lat, lng);
  },

  async getOrderByCode(orderCode: string): Promise<FoodOrder> {
    const normalized = orderCode.trim().toUpperCase();

    if (!ENV.USE_MOCK_API) {
      return apiClient.get<FoodOrder>(`/orders/${encodeURIComponent(normalized)}`);
    }

    await delay(180);
    const localMatch = useAppStore
      .getState()
      .placedOrders.find((o) => o.orderCode === normalized);

    if (localMatch) return localMatch;
    if (normalized === DEFAULT_DEMO_ORDER.orderCode) return DEFAULT_DEMO_ORDER;

    throw new ApiError(
      `Order "${normalized}" wasn't found. Try VNL-4092 or place a test order from any restaurant!`,
      404,
      'ORDER_NOT_FOUND',
    );
  },

  async getPortalSummary(zone: string): Promise<{
    summary: PortalDispatchSummary;
    recentOrders: FoodOrder[];
    spots: FoodSpot[];
  }> {
    if (!ENV.USE_MOCK_API) {
      return apiClient.get('/portal/dispatch-summary', { params: { zone } });
    }

    await delay(160);
    const placed = useAppStore.getState().placedOrders;
    const allOrders = [
      ...placed,
      DEFAULT_DEMO_ORDER,
      {
        ...DEFAULT_DEMO_ORDER,
        orderCode: 'VNL-3817',
        spotName: 'Smash Avenue',
        spotArea: 'Victoria Island',
        deliveryAddress: 'Adeola Odeku St, Victoria Island',
        status: 'preparing' as const,
        etaMinutes: 21,
        riderName: 'Chinedu Eze',
        totalNgn: 16400,
      },
    ];

    const filteredOrders =
      zone === 'All Zones'
        ? allOrders
        : allOrders.filter((o) => o.spotArea === zone);

    const spots = SEED_SPOTS.map((s) => hydrateSpotForLocation(s, 6.4478, 3.4723)).filter(
      (s) => zone === 'All Zones' || s.area === zone,
    );

    return {
      summary: {
        liveOrders: filteredOrders.length + 18,
        onlineRiders: zone === 'All Zones' ? 46 : 11,
        partnerKitchensOpen: spots.length,
        avgDeliveryMins: 19,
      },
      recentOrders: filteredOrders,
      spots,
    };
  },
};

export function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}
