export type CuisineCategory =
  | 'all'
  | 'local-dishes'
  | 'burgers-wraps'
  | 'grills-suya'
  | 'fresh-bowls'
  | 'pastries-drinks';

export interface UserLocation {
  id: string;
  area: string;
  city: string;
  streetHint: string;
  lat: number;
  lng: number;
  source: 'gps' | 'preset' | 'manual';
}

/** Function 1: Order Food for a Friend or Loved One */
export interface GiftRecipientInfo {
  hubId: string;
  hubLabel: string;
  recipientName: string;
  recipientPhone: string;
  streetAddress?: string;
  giftNote?: string;
}

/** Function 2: Outdoor Party & Event Feasts */
export type EventSpecialty =
  | 'all'
  | 'weddings'
  | 'birthdays'
  | 'corporate'
  | 'small-chops-grill'
  | 'traditional';

export interface OutdoorCaterer {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  hubId: string;
  cityLabel: string;
  specialties: Exclude<EventSpecialty, 'all'>[];
  specialtyLabels: string[];
  rating: number;
  eventsCompleted: number;
  minGuests: number;
  maxGuests: number;
  startingPerGuestNgn: number;
  verified: boolean;
  coverImage: string;
  signaturePackages: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceNgn: number;
  prepMins: number;
  popular?: boolean;
  spicy?: boolean;
  imageUrl: string;
}

export interface FoodSpot {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: Exclude<CuisineCategory, 'all'>;
  cuisineTags: string[];
  rating: number;
  reviewCount: number;
  area: string;
  lat: number;
  lng: number;
  /** Dynamically computed from user coordinates */
  distanceKm: number;
  etaMin: number;
  etaMax: number;
  deliveryFeeNgn: number;
  minOrderNgn: number;
  isOpen: boolean;
  promoBadge?: string;
  coverImage: string;
  menu: MenuItem[];
}

export interface NearbySpotFilters {
  lat: number;
  lng: number;
  category?: CuisineCategory;
  search?: string;
  onlyOpen?: boolean;
}

export interface CartItem {
  spotId: string;
  spotSlug: string;
  spotName: string;
  deliveryFeeNgn: number;
  item: MenuItem;
  quantity: number;
}

export type OrderStatus = 'preparing' | 'rider_assigned' | 'on_the_way' | 'delivered';

export interface OrderStep {
  id: string;
  title: string;
  subtitle: string;
  timeLabel: string;
  completed: boolean;
  active?: boolean;
}

export interface FoodOrder {
  orderCode: string;
  spotName: string;
  spotArea: string;
  deliveryAddress: string;
  status: OrderStatus;
  etaMinutes: number;
  riderName: string;
  riderBikePlate: string;
  riderRating: number;
  items: Array<{ name: string; quantity: number; priceNgn: number }>;
  subtotalNgn: number;
  deliveryFeeNgn: number;
  totalNgn: number;
  placedAtIso: string;
  steps: OrderStep[];
  /** Present when order was placed for a friend or loved one */
  giftRecipient?: GiftRecipientInfo;
}

export interface PortalDispatchSummary {
  liveOrders: number;
  onlineRiders: number;
  partnerKitchensOpen: number;
  avgDeliveryMins: number;
}

export interface UserSession {
  id: string;
  name: string;
  role: 'customer' | 'vendor_partner' | 'dispatcher';
  organization?: string;
  accessToken?: string;
}
