import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Gift,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { buildTrackOrderUrl, ROUTES } from '@/config/routes';
import { formatNgn } from '@/services/food.service';
import { useAppStore } from '@/store/useAppStore';

export function CartDrawer() {
  const navigate = useNavigate();
  const {
    cart,
    isCartOpen,
    setCartOpen,
    userLocation,
    giftRecipient,
    clearGiftRecipient,
    updateItemQuantity,
    clearCart,
    checkoutCart,
  } = useAppStore();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, c) => sum + c.item.priceNgn * c.quantity, 0);
  const deliveryFee = cart.length > 0 ? cart[0].deliveryFeeNgn : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    const order = checkoutCart();
    if (order) {
      navigate(buildTrackOrderUrl(order.orderCode));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close order bag"
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 bg-surface-inverse/55 backdrop-blur-sm"
      />

      {/* Slide-over Panel */}
      <aside className="relative z-10 flex h-[100dvh] w-full max-w-md flex-col border-l border-line bg-surface shadow-elevated">
        <div className="flex items-center justify-between border-b border-line bg-surface-elevated px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-control bg-brand-soft text-brand">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-base font-extrabold text-ink">Your Vinoli Bag</h2>
              {cart.length > 0 && (
                <p className="text-xs font-medium text-ink-muted">
                  From <span className="font-bold text-ink">{cart[0].spotName}</span>
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="rounded-control p-2 text-ink-muted hover:bg-surface-muted hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Delivery Pin Banner (Self vs Gift Recipient) */}
        {giftRecipient ? (
          <div className="flex items-start justify-between gap-2 border-b border-line bg-brand-soft px-5 py-3 text-xs">
            <div className="flex min-w-0 items-start gap-2">
              <Gift className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <div className="min-w-0">
                <p className="truncate font-extrabold text-ink">
                  For {giftRecipient.recipientName} ({giftRecipient.hubLabel})
                </p>
                <p className="truncate text-[11px] text-ink-muted">
                  Rider calls {giftRecipient.recipientPhone} on arrival
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearGiftRecipient}
              className="shrink-0 font-bold text-ink-muted underline hover:text-alert"
            >
              Clear
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 border-b border-line bg-plum-soft/60 px-5 py-3 text-xs">
            <div className="flex min-w-0 items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-brand" />
              <div className="truncate">
                <span className="font-bold text-ink">
                  Delivering to {userLocation.area}:{' '}
                </span>
                <span className="text-ink-muted">{userLocation.streetHint}</span>
              </div>
            </div>
            <Link
              to={`${ROUTES.HOME}#order-for-friend`}
              onClick={() => setCartOpen(false)}
              className="shrink-0 font-extrabold text-brand hover:underline"
            >
              Send to friend
            </Link>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted text-ink-subtle">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <p className="mt-4 font-display text-base font-bold text-ink">
                Your bag is empty
              </p>
              <p className="mt-1 max-w-xs text-sm text-ink-muted">
                Pick a food spot around {userLocation.area} and add your cravings to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((entry) => (
                <div
                  key={entry.item.id}
                  className="flex items-center justify-between gap-3 rounded-card border border-line bg-surface-elevated p-3.5"
                >
                  <img
                    src={entry.item.imageUrl}
                    alt={entry.item.name}
                    className="h-14 w-14 shrink-0 rounded-control object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">{entry.item.name}</p>
                    <p className="mt-0.5 font-mono text-xs font-semibold text-brand">
                      {formatNgn(entry.item.priceNgn * entry.quantity)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-1">
                    <button
                      type="button"
                      onClick={() => updateItemQuantity(entry.item.id, -1)}
                      className="rounded-full p-1 text-ink-muted hover:bg-surface-muted hover:text-ink"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[1.25rem] text-center font-mono text-xs font-bold text-ink">
                      {entry.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateItemQuantity(entry.item.id, 1)}
                      className="rounded-full bg-brand p-1 text-brand-foreground hover:bg-brand-hover"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-ink-subtle hover:text-alert"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear bag</span>
              </button>
            </div>
          )}
        </div>

        {/* Checkout Footer */}
        {cart.length > 0 && (
          <div className="border-t border-line bg-surface-elevated p-5">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-ink-muted">
                <span>Meal subtotal</span>
                <span className="font-mono font-semibold text-ink">{formatNgn(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>Rider delivery fee</span>
                <span className="font-mono font-semibold text-ink">
                  {deliveryFee === 0 ? 'FREE' : formatNgn(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-line pt-2.5 text-base font-extrabold text-ink">
                <span>Total</span>
                <span className="font-mono text-brand">{formatNgn(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-control bg-brand px-5 py-3.5 text-sm font-bold text-brand-foreground shadow-brand transition hover:bg-brand-hover"
            >
              <span>Place Order &amp; Track Rider</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
