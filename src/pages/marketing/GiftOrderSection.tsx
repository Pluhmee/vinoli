import { type FormEvent, useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { DELIVERY_CITY_HUBS } from '@/services/location.service';
import { useAppStore } from '@/store/useAppStore';

interface GiftOrderSectionProps {
  onRecipientReady?: () => void;
}

export function GiftOrderSection({ onRecipientReady }: GiftOrderSectionProps) {
  const { giftRecipient, setGiftRecipient, clearGiftRecipient } = useAppStore();

  const [hubId, setHubId] = useState(
    giftRecipient?.hubId ?? DELIVERY_CITY_HUBS[0].id,
  );
  const [recipientName, setRecipientName] = useState(
    giftRecipient?.recipientName ?? '',
  );
  const [recipientPhone, setRecipientPhone] = useState(
    giftRecipient?.recipientPhone ?? '',
  );
  const [streetAddress, setStreetAddress] = useState(
    giftRecipient?.streetAddress ?? '',
  );
  const [giftNote, setGiftNote] = useState(giftRecipient?.giftNote ?? '');
  const [savedToast, setSavedToast] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !recipientPhone.trim()) return;

    const selectedHub =
      DELIVERY_CITY_HUBS.find((h) => h.id === hubId) ?? DELIVERY_CITY_HUBS[0];

    setGiftRecipient({
      hubId: selectedHub.id,
      hubLabel: selectedHub.shortLabel,
      recipientName: recipientName.trim(),
      recipientPhone: recipientPhone.trim(),
      streetAddress: streetAddress.trim() || undefined,
      giftNote: giftNote.trim() || undefined,
    });

    setSavedToast(true);
    window.setTimeout(() => setSavedToast(false), 3500);
    onRecipientReady?.();
  };

  return (
    <section
      id="order-for-friend"
      className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="rounded-[1.5rem] bg-[#F4ECE0] px-5 py-8 dark:bg-[#1E0538] dark:ring-1 dark:ring-white/10 sm:rounded-[2.25rem] sm:px-10 sm:py-12 lg:px-14">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Column — No badges, no chip soup */}
          <div className="lg:col-span-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#EB5605] dark:text-[#FC7B0F]">
              Send a meal
            </p>

            <h2
              style={{ fontFamily: "'Poppins', var(--font-display)" }}
              className="mt-2.5 text-2xl font-black uppercase leading-[1.06] tracking-tight text-[#2A054D] dark:text-[#FDF9ED] sm:text-3xl lg:text-[2.3rem]"
            >
              Order food for a friend or loved one.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#4B2D6E] dark:text-[#CEBFDE] sm:text-base">
              Surprise someone across town or in another Nigerian city — Lagos, Abuja,
              Asaba, Port Harcourt, Awka, Onitsha, Warri, or Uyo. Pick their hub and a
              local rider delivers straight to their door.
            </p>

            {giftRecipient && (
              <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-[#140226] dark:ring-1 dark:ring-white/10">
                <div className="min-w-0">
                  <p className="truncate text-xs font-extrabold text-[#2A054D] dark:text-[#FDF9ED]">
                    Delivering to {giftRecipient.recipientName}
                  </p>
                  <p className="truncate text-xs text-[#604778] dark:text-[#CEBFDE]">
                    {giftRecipient.hubLabel} · {giftRecipient.recipientPhone}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearGiftRecipient}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-[#604778] hover:text-alert dark:text-[#CEBFDE]"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Form — Clean, flat inputs directly on surface */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-7">
            <div>
              <label
                htmlFor="gift-hub-select"
                className="block text-xs font-bold text-[#2A054D] dark:text-[#FDF9ED]"
              >
                Delivery city or hub
              </label>
              <select
                id="gift-hub-select"
                value={hubId}
                onChange={(e) => setHubId(e.target.value)}
                className="mt-1.5 h-12 w-full rounded-2xl border border-[#DFD3BE] bg-white px-4 text-base font-semibold text-[#2A054D] focus:border-[#FC7B0F] focus:outline-none dark:border-white/15 dark:bg-[#140226] dark:text-[#FDF9ED] sm:text-sm"
              >
                {DELIVERY_CITY_HUBS.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    {hub.optionLabel}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="gift-recipient-name"
                  className="block text-xs font-bold text-[#2A054D] dark:text-[#FDF9ED]"
                >
                  Recipient’s name
                </label>
                <input
                  id="gift-recipient-name"
                  required
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Chidinma Nwosu"
                  className="mt-1.5 h-12 w-full rounded-2xl border border-[#DFD3BE] bg-white px-4 text-base font-medium text-[#2A054D] placeholder:text-[#8A759E] focus:border-[#FC7B0F] focus:outline-none dark:border-white/15 dark:bg-[#140226] dark:text-[#FDF9ED] sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="gift-recipient-phone"
                  className="block text-xs font-bold text-[#2A054D] dark:text-[#FDF9ED]"
                >
                  Friend’s phone (for rider arrival)
                </label>
                <input
                  id="gift-recipient-phone"
                  required
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="+234 803 000 0000"
                  className="mt-1.5 h-12 w-full rounded-2xl border border-[#DFD3BE] bg-white px-4 text-base font-medium text-[#2A054D] placeholder:text-[#8A759E] focus:border-[#FC7B0F] focus:outline-none dark:border-white/15 dark:bg-[#140226] dark:text-[#FDF9ED] sm:text-sm"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="gift-street"
                  className="block text-xs font-bold text-[#604778] dark:text-[#CEBFDE]"
                >
                  Street or gate landmark (optional)
                </label>
                <input
                  id="gift-street"
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="12 Okpanam Rd, Asaba"
                  className="mt-1.5 h-12 w-full rounded-2xl border border-[#DFD3BE] bg-white px-4 text-base font-medium text-[#2A054D] placeholder:text-[#8A759E] focus:border-[#FC7B0F] focus:outline-none dark:border-white/15 dark:bg-[#140226] dark:text-[#FDF9ED] sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="gift-note"
                  className="block text-xs font-bold text-[#604778] dark:text-[#CEBFDE]"
                >
                  Short note on bag (optional)
                </label>
                <input
                  id="gift-note"
                  type="text"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Lunch is on me today!"
                  className="mt-1.5 h-12 w-full rounded-2xl border border-[#DFD3BE] bg-white px-4 text-base font-medium text-[#2A054D] placeholder:text-[#8A759E] focus:border-[#FC7B0F] focus:outline-none dark:border-white/15 dark:bg-[#140226] dark:text-[#FDF9ED] sm:text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#2A054D] px-7 text-sm font-extrabold text-[#FDF9ED] transition hover:bg-[#FC7B0F] hover:text-white dark:bg-[#FC7B0F] dark:text-white dark:hover:bg-[#FF8E2B] sm:w-auto"
              >
                <span>Browse kitchens for them</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {savedToast && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EB5605] dark:text-[#FC7B0F]">
                  <Check className="h-4 w-4" />
                  <span>Recipient set — pick a spot above</span>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default GiftOrderSection;
