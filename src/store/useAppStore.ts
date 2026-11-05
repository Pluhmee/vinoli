import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import { DELIVERY_CITY_HUBS } from '@/services/location.service';
import type {
  CartItem,
  FoodOrder,
  GiftRecipientInfo,
  MenuItem,
  UserLocation,
  UserSession,
} from '@/types/food';

/** Iframe-safe storage fallback when third-party localStorage is blocked by browser privacy settings */
const memoryFallback = new Map<string, string>();
const safeStorage: StateStorage = {
  getItem: (name) => {
    try {
      return window.localStorage.getItem(name);
    } catch {
      return memoryFallback.get(name) ?? null;
    }
  },
  setItem: (name, value) => {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      memoryFallback.set(name, value);
    }
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name);
    } catch {
      memoryFallback.delete(name);
    }
  },
};

export const PRESET_LOCATIONS: UserLocation[] = [
  {
    id: 'loc_lekki_1',
    area: 'Lekki Phase 1',
    city: 'Lagos',
    streetHint: 'Admiralty Way & Fola Osibo Corridor',
    lat: 6.4478,
    lng: 3.4723,
    source: 'preset',
  },
  {
    id: 'loc_vi',
    area: 'Victoria Island',
    city: 'Lagos',
    streetHint: 'Adeola Odeku & Akin Adesola',
    lat: 6.4281,
    lng: 3.4219,
    source: 'preset',
  },
  {
    id: 'loc_ikeja',
    area: 'Ikeja GRA',
    city: 'Lagos',
    streetHint: 'Isaac John & Joel Ogunnaike',
    lat: 6.5818,
    lng: 3.3568,
    source: 'preset',
  },
  {
    id: 'loc_yaba',
    area: 'Yaba & Akoka',
    city: 'Lagos',
    streetHint: 'Herbert Macaulay & Montgomery Rd',
    lat: 6.5158,
    lng: 3.3781,
    source: 'preset',
  },
  {
    id: 'loc_surulere',
    area: 'Surulere',
    city: 'Lagos',
    streetHint: 'Adeniran Ogunsanya & Bode Thomas',
    lat: 6.4983,
    lng: 3.3539,
    source: 'preset',
  },
  {
    id: 'loc_ikoyi',
    area: 'Ikoyi',
    city: 'Lagos',
    streetHint: 'Awolowo Rd & Bourdillon',
    lat: 6.4549,
    lng: 3.4346,
    source: 'preset',
  },
];

function findNearestPreset(lat: number, lng: number): UserLocation {
  let closest = PRESET_LOCATIONS[0];
  let bestSq = Number.POSITIVE_INFINITY;
  for (const loc of PRESET_LOCATIONS) {
    const dSq = (loc.lat - lat) ** 2 + (loc.lng - lng) ** 2;
    if (dSq < bestSq) {
      bestSq = dSq;
      closest = loc;
    }
  }
  return closest;
}

export type ThemeMode = 'light' | 'dark';
export type AuthModalMode = 'login' | 'register';

interface AppState {
  /* Theme & Header Utility State */
  theme: ThemeMode;
  unreadNotifications: number;
  isLoginOpen: boolean;
  authModalMode: AuthModalMode;
  authDefaultRole: UserSession['role'];

  /* Customer Location State */
  userLocation: UserLocation;
  isLocating: boolean;
  locationNotice: string | null;

  /* Function 1: Order Food for a Friend or Loved One */
  giftRecipient: GiftRecipientInfo | null;

  /* Function 2: Outdoor Event Caterer Registration Modal */
  isCatererModalOpen: boolean;

  /* Slide-over Bag / Cart State */
  cart: CartItem[];
  isCartOpen: boolean;

  /* Placed / Recent Orders */
  placedOrders: FoodOrder[];
  activeOrderCode: string;

  /* Partner / Portal State */
  isSidebarCollapsed: boolean;
  activeZoneFilter: string;
  session: UserSession | null;

  /* Theme & Modal Actions */
  toggleTheme: () => void;
  markNotificationsRead: () => void;
  setLoginOpen: (open: boolean) => void;
  openAuthModal: (mode: AuthModalMode, role?: UserSession['role']) => void;
  logout: () => void;

  /* Location Actions */
  setPresetLocation: (presetId: string) => void;
  setResolvedLocation: (location: UserLocation) => void;
  setManualAddress: (addressText: string) => void;
  detectCurrentLocation: () => Promise<void>;

  /* Function 1 Actions: Gift / Friend Delivery */
  setGiftRecipient: (recipient: GiftRecipientInfo) => void;
  clearGiftRecipient: () => void;

  /* Function 2 Actions: Outdoor Event Caterer Onboarding */
  setCatererModalOpen: (open: boolean) => void;

  /* Cart Actions */
  setCartOpen: (open: boolean) => void;
  addToCart: (payload: {
    spotId: string;
    spotSlug: string;
    spotName: string;
    deliveryFeeNgn: number;
    item: MenuItem;
  }) => void;
  updateItemQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  checkoutCart: () => FoodOrder | null;

  /* Portal Actions */
  toggleSidebar: () => void;
  setActiveZoneFilter: (zone: string) => void;
  setSession: (session: UserSession | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      unreadNotifications: 1,
      isLoginOpen: false,
      authModalMode: 'login',
      authDefaultRole: 'customer',

      userLocation: PRESET_LOCATIONS[0],
      isLocating: false,
      locationNotice: null,

      giftRecipient: null,
      isCatererModalOpen: false,

      cart: [],
      isCartOpen: false,

      placedOrders: [],
      activeOrderCode: 'VNL-4092',

      isSidebarCollapsed: false,
      activeZoneFilter: 'All Zones',
      session: null,

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      markNotificationsRead: () => set({ unreadNotifications: 0 }),

      setLoginOpen: (open) =>
        set((state) => ({
          isLoginOpen: open,
          authModalMode: open ? 'login' : state.authModalMode,
        })),

      openAuthModal: (mode, role = 'customer') =>
        set({
          isLoginOpen: true,
          authModalMode: mode,
          authDefaultRole: role,
        }),

      logout: () => set({ session: null }),

      setPresetLocation: (presetId) => {
        const match = PRESET_LOCATIONS.find((l) => l.id === presetId);
        if (match) {
          set({
            userLocation: match,
            locationNotice: `Showing food spots around ${match.area}`,
          });
        }
      },

      setResolvedLocation: (location) =>
        set({
          userLocation: location,
          locationNotice: `Showing food spots around ${location.area}`,
        }),

      setGiftRecipient: (recipient) => {
        const matchedHub = DELIVERY_CITY_HUBS.find((h) => h.id === recipient.hubId);
        const current = get().userLocation;

        const nextLocation: UserLocation =
          matchedHub && !matchedHub.isSameCityDefault
            ? {
                id: matchedHub.id,
                area: matchedHub.area,
                city: matchedHub.city,
                streetHint: recipient.streetAddress?.trim() || matchedHub.streetHint,
                lat: matchedHub.lat,
                lng: matchedHub.lng,
                source: 'manual',
              }
            : {
                ...current,
                streetHint:
                  recipient.streetAddress?.trim() ||
                  `For ${recipient.recipientName} · ${current.streetHint}`,
                source: 'manual',
              };

        set({
          giftRecipient: recipient,
          userLocation: nextLocation,
          locationNotice: `Ordering for ${recipient.recipientName} (${nextLocation.area})`,
        });
      },

      clearGiftRecipient: () =>
        set({
          giftRecipient: null,
          locationNotice: null,
        }),

      setCatererModalOpen: (open) => set({ isCatererModalOpen: open }),

      setManualAddress: (addressText) => {
        const trimmed = addressText.trim();
        if (!trimmed) return;
        const lower = trimmed.toLowerCase();
        const matchedPreset = PRESET_LOCATIONS.find(
          (l) =>
            lower.includes(l.area.toLowerCase()) ||
            l.area.toLowerCase().includes(lower) ||
            lower.includes(l.streetHint.toLowerCase().split(' ')[0]),
        );

        const base = matchedPreset ?? get().userLocation;
        set({
          userLocation: {
            id: `manual_${Date.now()}`,
            area: matchedPreset ? matchedPreset.area : trimmed,
            city: 'Lagos',
            streetHint: trimmed,
            lat: base.lat,
            lng: base.lng,
            source: 'manual',
          },
          locationNotice: `Pinned delivery to "${trimmed}"`,
        });
      },

      detectCurrentLocation: async () => {
        set({ isLocating: true, locationNotice: null });

        if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
          const fallback = PRESET_LOCATIONS[0];
          set({
            isLocating: false,
            userLocation: { ...fallback, source: 'gps' },
            locationNotice: `Located near ${fallback.area}, ${fallback.city}`,
          });
          return;
        }

        await new Promise<void>((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              const inLagosBounds =
                latitude > 6.35 && latitude < 6.72 && longitude > 3.15 && longitude < 3.65;
              const nearest = findNearestPreset(latitude, longitude);

              set({
                isLocating: false,
                userLocation: inLagosBounds
                  ? {
                      ...nearest,
                      lat: latitude,
                      lng: longitude,
                      source: 'gps',
                      streetHint: `GPS Pin (${latitude.toFixed(3)}°N, ${longitude.toFixed(3)}°E)`,
                    }
                  : {
                      ...nearest,
                      source: 'gps',
                      streetHint: `GPS Active · Matched to ${nearest.area} kitchens`,
                    },
                locationNotice: `GPS locked — showing kitchens around ${nearest.area}`,
              });
              resolve();
            },
            () => {
              const current = get().userLocation;
              set({
                isLocating: false,
                userLocation: {
                  ...current,
                  source: 'gps',
                  streetHint: `Live Pin · ${current.streetHint}`,
                },
                locationNotice: `Location set to ${current.area}, ${current.city}`,
              });
              resolve();
            },
            { enableHighAccuracy: false, timeout: 4500 },
          );
        });
      },

      setCartOpen: (open) => set({ isCartOpen: open }),

      addToCart: ({ spotId, spotSlug, spotName, deliveryFeeNgn, item }) =>
        set((state) => {
          const differentKitchen =
            state.cart.length > 0 && state.cart[0].spotId !== spotId;
          const baseCart = differentKitchen ? [] : state.cart;
          const existing = baseCart.find((c) => c.item.id === item.id);

          const updated = existing
            ? baseCart.map((c) =>
                c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
              )
            : [
                ...baseCart,
                { spotId, spotSlug, spotName, deliveryFeeNgn, item, quantity: 1 },
              ];

          return { cart: updated, isCartOpen: true };
        }),

      updateItemQuantity: (itemId, delta) =>
        set((state) => ({
          cart: state.cart
            .map((c) =>
                c.item.id === itemId ? { ...c, quantity: c.quantity + delta } : c,
            )
            .filter((c) => c.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),

      checkoutCart: () => {
        const { cart, userLocation, placedOrders, giftRecipient } = get();
        if (cart.length === 0) return null;

        const subtotal = cart.reduce(
          (sum, entry) => sum + entry.item.priceNgn * entry.quantity,
          0,
        );
        const deliveryFee = cart[0].deliveryFeeNgn;
        const orderCode = `VNL-${Math.floor(1000 + Math.random() * 9000)}`;
        const nowTime = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const dropOffAddress = giftRecipient
          ? `${giftRecipient.streetAddress || userLocation.streetHint} · ${giftRecipient.hubLabel}`
          : `${userLocation.streetHint}, ${userLocation.area}`;

        const newOrder: FoodOrder = {
          orderCode,
          spotName: cart[0].spotName,
          spotArea: userLocation.area,
          deliveryAddress: dropOffAddress,
          status: 'on_the_way',
          etaMinutes: 16,
          riderName: 'Tunde Balogun',
          riderBikePlate: 'LSR-719-VN',
          riderRating: 4.9,
          items: cart.map((c) => ({
            name: c.item.name,
            quantity: c.quantity,
            priceNgn: c.item.priceNgn,
          })),
          subtotalNgn: subtotal,
          deliveryFeeNgn: deliveryFee,
          totalNgn: subtotal + deliveryFee,
          placedAtIso: new Date().toISOString(),
          ...(giftRecipient ? { giftRecipient } : {}),
          steps: [
            {
              id: 'st_1',
              title: 'Order accepted by kitchen',
              subtitle: `${cart[0].spotName} started prepping ${
                giftRecipient ? `${giftRecipient.recipientName}'s gift meal` : 'your meal'
              }`,
              timeLabel: nowTime,
              completed: true,
            },
            {
              id: 'st_2',
              title: 'Rider assigned & heading to pickup',
              subtitle: 'Tunde Balogun (4.9 ★) matched near restaurant',
              timeLabel: 'In progress',
              completed: true,
              active: true,
            },
            {
              id: 'st_3',
              title: giftRecipient
                ? `Gift drop-off to ${giftRecipient.recipientName}`
                : `Drop-off at ${userLocation.area}`,
              subtitle: giftRecipient
                ? `Rider calling ${giftRecipient.recipientPhone} on arrival`
                : userLocation.streetHint,
              timeLabel: '~16 mins',
              completed: false,
            },
          ],
        };

        set({
          placedOrders: [newOrder, ...placedOrders],
          activeOrderCode: orderCode,
          unreadNotifications: get().unreadNotifications + 1,
          cart: [],
          isCartOpen: false,
        });

        return newOrder;
      },

      toggleSidebar: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

      setActiveZoneFilter: (zone) => set({ activeZoneFilter: zone }),

      setSession: (session) => set({ session }),
    }),
    {
      name: 'vinoli-food-store-v3',
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        theme: state.theme,
        userLocation: state.userLocation,
        giftRecipient: state.giftRecipient,
        cart: state.cart,
        placedOrders: state.placedOrders,
        activeOrderCode: state.activeOrderCode,
        isSidebarCollapsed: state.isSidebarCollapsed,
        session: state.session,
      }),
    },
  ),
);
