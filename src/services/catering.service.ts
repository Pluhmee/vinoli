import type { EventSpecialty, OutdoorCaterer } from '@/types/food';

export const CATERING_SPECIALTIES: Array<{
  id: EventSpecialty;
  label: string;
}> = [
  { id: 'all', label: 'All Celebrations' },
  { id: 'weddings', label: 'Weddings & Owambe' },
  { id: 'birthdays', label: 'Birthday Bashes' },
  { id: 'corporate', label: 'Corporate Summits' },
  { id: 'small-chops-grill', label: 'Live Grill & Small Chops' },
  { id: 'traditional', label: 'Family & Traditional Feasts' },
];

export interface RegisterCatererPayload {
  name: string;
  leadChef: string;
  phone: string;
  hubId: string;
  cityLabel: string;
  specialties: Exclude<EventSpecialty, 'all'>[];
  minGuests: number;
  maxGuests: number;
  startingPerGuestNgn: number;
  tagline: string;
}

const INITIAL_CATERERS: OutdoorCaterer[] = [
  {
    id: 'cat_01',
    slug: 'royal-marquee-feasts-lagos',
    name: 'Royal Marquee & Firewood Feasts',
    tagline:
      'Full-service wedding & owambe buffet stations with gold chafing warmers, uniformed servers & live firewood jollof.',
    hubId: 'hub_lagos',
    cityLabel: 'Lagos State (Lekki / VI / Ikeja)',
    specialties: ['weddings', 'traditional', 'birthdays'],
    specialtyLabels: ['Weddings', 'Owambe Buffets', 'Uniformed Stewards'],
    rating: 4.9,
    eventsCompleted: 214,
    minGuests: 80,
    maxGuests: 1500,
    startingPerGuestNgn: 8500,
    verified: true,
    coverImage: '/images/outdoor-catering.jpg',
    signaturePackages: [
      'Grand Owambe 3-CourseChafing Buffet',
      'Smoky Party Jollof + Peppered Asun Live Station',
      'VIP Cocktail & Small Chops Reception',
    ],
  },
  {
    id: 'cat_02',
    slug: 'delta-crown-outdoor-catering-asaba',
    name: 'Delta Crown Event Caterers',
    tagline:
      'Trusted outdoor party catering across Asaba & Warri for traditional marriages, birthdays, and thanksgiving receptions.',
    hubId: 'hub_asaba',
    cityLabel: 'Asaba & Warri (Delta State)',
    specialties: ['weddings', 'traditional', 'birthdays'],
    specialtyLabels: ['Traditional Marriages', 'Banga & Starch Live Pot', 'Party Jollof'],
    rating: 4.9,
    eventsCompleted: 148,
    minGuests: 50,
    maxGuests: 1000,
    startingPerGuestNgn: 7200,
    verified: true,
    coverImage: '/images/spot-jollof.jpg',
    signaturePackages: [
      'Delta Royal Traditional Marriage Feast',
      'Birthday Bash Grill & Cocktail Platter',
      'Executive Tent & Chafing Dish Service',
    ],
  },
  {
    id: 'cat_03',
    slug: 'capital-summit-banquets-abuja',
    name: 'Capital Summit & Banquet Co.',
    tagline:
      'Executive outdoor catering for corporate summits, diplomatic garden receptions, and luxury weddings in Abuja.',
    hubId: 'hub_abuja',
    cityLabel: 'Abuja Central (FCT)',
    specialties: ['corporate', 'weddings', 'small-chops-grill'],
    specialtyLabels: ['Corporate Summits', 'Continental & Nigerian', 'Canapés'],
    rating: 4.8,
    eventsCompleted: 176,
    minGuests: 40,
    maxGuests: 1200,
    startingPerGuestNgn: 9500,
    verified: true,
    coverImage: '/images/outdoor-catering.jpg',
    signaturePackages: [
      'Corporate Summit All-Day Tea Break & Buffet',
      'Garden Wedding Plated & Chafing Experience',
      'Live Charcoal Suya, Massa & Grill Bar',
    ],
  },
  {
    id: 'cat_04',
    slug: 'anambra-heritage-party-kitchen',
    name: 'Eastern Heritage Event Kitchens',
    tagline:
      'High-capacity outdoor feast specialists serving Awka and Onitsha homecomings, weddings, and family celebrations.',
    hubId: 'hub_awka',
    cityLabel: 'Awka & Onitsha (Anambra)',
    specialties: ['traditional', 'weddings', 'birthdays'],
    specialtyLabels: ['Igba Nkwu Feasts', 'Ofe Owerri & Pounded Yam', 'Small Chops'],
    rating: 4.9,
    eventsCompleted: 192,
    minGuests: 100,
    maxGuests: 2000,
    startingPerGuestNgn: 7000,
    verified: true,
    coverImage: '/images/plate-swallow.jpg',
    signaturePackages: [
      'Igba Nkwu Full Compound Catering',
      'Oriental & Continental Chafing Line',
      'Palm-Wine & Peppered Bushmeat Grill Corner',
    ],
  },
  {
    id: 'cat_05',
    slug: 'garden-city-flame-caterers',
    name: 'Garden City Flame & Chops',
    tagline:
      'Live seafood grills, gourmet small chops towers, and outdoor buffet service across Port Harcourt GRA and Uyo.',
    hubId: 'hub_ph',
    cityLabel: 'Port Harcourt GRA & Uyo',
    specialties: ['small-chops-grill', 'birthdays', 'corporate'],
    specialtyLabels: ['Live Seafood & Grill', 'Birthday Bashes', 'Small Chops Towers'],
    rating: 4.8,
    eventsCompleted: 134,
    minGuests: 30,
    maxGuests: 800,
    startingPerGuestNgn: 7800,
    verified: true,
    coverImage: '/images/plate-grill.jpg',
    signaturePackages: [
      'Live Bole, Prawns & Croaker Grill Station',
      'Luxury Small Chops & Mocktail Bar',
      'Family Celebration Buffet Package',
    ],
  },
  {
    id: 'cat_06',
    slug: 'ibom-signature-events-uyo',
    name: 'Ibom Signature Event Feasts',
    tagline:
      'Celebrated Akwa Ibom culinary team delivering unforgettable Edikang Ikong, Afang & party jollof spreads for outdoor events.',
    hubId: 'hub_uyo',
    cityLabel: 'Uyo (Akwa Ibom State)',
    specialties: ['weddings', 'traditional', 'corporate'],
    specialtyLabels: ['Afang & Edikang Ikong', 'State & Corporate Events', 'Weddings'],
    rating: 4.9,
    eventsCompleted: 119,
    minGuests: 50,
    maxGuests: 1000,
    startingPerGuestNgn: 7500,
    verified: true,
    coverImage: '/images/plate-stew.jpg',
    signaturePackages: [
      'Signature Akwa Ibom Royal Banquet',
      'Corporate Retreat Buffet & Pastry Table',
      'Outdoor Birthday Grill & Chops',
    ],
  },
];

let runtimeCaterers: OutdoorCaterer[] = [...INITIAL_CATERERS];

const SPECIALTY_LABELS: Record<Exclude<EventSpecialty, 'all'>, string> = {
  weddings: 'Weddings & Owambe',
  birthdays: 'Birthday Bashes',
  corporate: 'Corporate Summits',
  'small-chops-grill': 'Small Chops & Grill',
  traditional: 'Traditional Feasts',
};

export function listOutdoorCaterers(filters?: {
  hubId?: string;
  specialty?: EventSpecialty;
  search?: string;
}): OutdoorCaterer[] {
  return runtimeCaterers.filter((cat) => {
    if (
      filters?.hubId &&
      filters.hubId !== 'all_same_city' &&
      cat.hubId !== filters.hubId
    ) {
      // Allow paired neighbor hubs (Asaba/Warri, Awka/Onitsha) to surface helpfully
      const neighborMatch =
        (filters.hubId === 'hub_warri' && cat.hubId === 'hub_asaba') ||
        (filters.hubId === 'hub_onitsha' && cat.hubId === 'hub_awka');
      if (!neighborMatch) return false;
    }

    if (
      filters?.specialty &&
      filters.specialty !== 'all' &&
      !cat.specialties.includes(filters.specialty)
    ) {
      return false;
    }

    if (filters?.search?.trim()) {
      const q = filters.search.trim().toLowerCase();
      const hay =
        `${cat.name} ${cat.tagline} ${cat.cityLabel} ${cat.specialtyLabels.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    return true;
  });
}

export function registerOutdoorCaterer(payload: RegisterCatererPayload): OutdoorCaterer {
  const specs: Exclude<EventSpecialty, 'all'>[] =
    payload.specialties.length > 0 ? payload.specialties : ['weddings', 'birthdays'];

  const created: OutdoorCaterer = {
    id: `cat_${Date.now()}`,
    slug: payload.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    name: payload.name.trim(),
    tagline:
      payload.tagline.trim() ||
      `Led by ${payload.leadChef.trim()} · Custom outdoor buffet, live stations & event hospitality.`,
    hubId: payload.hubId === 'all_same_city' ? 'hub_lagos' : payload.hubId,
    cityLabel: payload.cityLabel,
    specialties: specs,
    specialtyLabels: specs.map((s) => SPECIALTY_LABELS[s]),
    rating: 5.0,
    eventsCompleted: 1,
    minGuests: payload.minGuests,
    maxGuests: payload.maxGuests,
    startingPerGuestNgn: payload.startingPerGuestNgn,
    verified: true,
    coverImage: '/images/outdoor-catering.jpg',
    signaturePackages: [
      'Custom Event Chafing Buffet',
      'Party Jollof, Protein & Small Chops Platter',
    ],
  };

  runtimeCaterers = [created, ...runtimeCaterers];
  return created;
}
