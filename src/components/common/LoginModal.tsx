import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bike,
  CheckCircle2,
  Eye,
  EyeOff,
  Store,
  User,
  X,
} from 'lucide-react';
import { ROUTES } from '@/config/routes';
import {
  type AuthModalMode,
  PRESET_LOCATIONS,
  useAppStore,
} from '@/store/useAppStore';
import type { UserSession } from '@/types/food';

type RoleOption = UserSession['role'];

export function LoginModal() {
  const navigate = useNavigate();
  const {
    isLoginOpen,
    authModalMode,
    authDefaultRole,
    setLoginOpen,
    openAuthModal,
    setSession,
  } = useAppStore();

  const [mode, setMode] = useState<AuthModalMode>(authModalMode);
  const [role, setRole] = useState<RoleOption>(authDefaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [kitchenName, setKitchenName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zone, setZone] = useState(PRESET_LOCATIONS[0].area);
  const [password, setPassword] = useState('');

  // Sync internal tab & default role whenever modal opens
  useEffect(() => {
    if (isLoginOpen) {
      setMode(authModalMode);
      setRole(authDefaultRole);
      setErrorMessage(null);
      setResetSent(false);
    }
  }, [isLoginOpen, authModalMode, authDefaultRole]);

  // Lock background scroll + close on Escape
  useEffect(() => {
    if (!isLoginOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLoginOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isLoginOpen, setLoginOpen]);

  if (!isLoginOpen) return null;

  const switchMode = (nextMode: AuthModalMode) => {
    setMode(nextMode);
    openAuthModal(nextMode, role);
    setErrorMessage(null);
    setResetSent(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (mode === 'register' && password.trim().length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    const fallbackName =
      role === 'vendor_partner'
        ? kitchenName.trim() || 'Partner Kitchen'
        : role === 'dispatcher'
          ? 'Tunde Balogun'
          : emailOrPhone.split('@')[0] || 'Adaeze Okafor';

    const resolvedName =
      mode === 'register' ? fullName.trim() || fallbackName : fallbackName;

    const resolvedOrg =
      role === 'vendor_partner'
        ? kitchenName.trim() || `${zone} Partner Kitchen`
        : role === 'dispatcher'
          ? `Vinoli Rider · ${zone}`
          : 'Vinoli Customer';

    setSession({
      id: `usr_${Date.now()}`,
      name: resolvedName,
      role,
      organization: resolvedOrg,
    });

    setLoginOpen(false);

    if (role !== 'customer') {
      navigate(ROUTES.PORTAL.ROOT);
    }
  };

  const handleForgotPassword = () => {
    if (!emailOrPhone.trim()) {
      setErrorMessage('Enter your email or phone number first so we can send a reset code.');
      return;
    }
    setErrorMessage(null);
    setResetSent(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vinoli-auth-heading"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-5"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close authentication modal"
        onClick={() => setLoginOpen(false)}
        className="fixed inset-0 bg-surface-inverse/65 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <div className="relative z-10 my-auto w-full max-w-[28rem] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[1.5rem] border border-line bg-surface-elevated p-5 shadow-elevated sm:max-h-[calc(100dvh-3rem)] sm:rounded-[1.75rem] sm:p-7">
        {/* Top Row: Brand Capsule + Close Button */}
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-full bg-[#2A054D] px-4 py-1.5 ring-1 ring-white/10">
            <img src="/vinoli-pill-logo.png" alt="Vinoli" className="h-5 w-auto sm:h-6" />
          </div>
          <button
            type="button"
            onClick={() => setLoginOpen(false)}
            aria-label="Close modal"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-surface-muted hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Segmented Toggle: [ Sign In | Create Account ] */}
        <div className="mt-5 grid grid-cols-2 gap-1.5 rounded-full border border-line bg-surface p-1">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`rounded-full py-2 text-xs font-extrabold transition sm:text-sm ${
              mode === 'login'
                ? 'bg-[#2A054D] text-[#FDF9ED] shadow-sm dark:bg-brand dark:text-white'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
            className={`rounded-full py-2 text-xs font-extrabold transition sm:text-sm ${
              mode === 'register'
                ? 'bg-[#2A054D] text-[#FDF9ED] shadow-sm dark:bg-brand dark:text-white'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Heading */}
        <div className="mt-5">
          <h2
            id="vinoli-auth-heading"
            className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl"
          >
            {mode === 'login' ? 'Welcome back to Vinoli' : 'Create your Vinoli account'}
          </h2>
          <p className="mt-1 text-xs text-ink-muted sm:text-sm">
            {mode === 'login'
              ? 'Sign in to order faster, save addresses, or manage dispatch.'
              : 'Set up your account in seconds for hot local food delivery.'}
          </p>
        </div>

        {/* Account Type Selector: Order / Restaurant / Rider */}
        <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-full bg-surface-muted p-1">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-extrabold transition ${
              role === 'customer'
                ? 'bg-brand text-brand-foreground shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <User className="h-3.5 w-3.5 shrink-0" />
            <span>Order</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('vendor_partner')}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-extrabold transition ${
              role === 'vendor_partner'
                ? 'bg-brand text-brand-foreground shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Store className="h-3.5 w-3.5 shrink-0" />
            <span>Kitchen</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('dispatcher')}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-extrabold transition ${
              role === 'dispatcher'
                ? 'bg-brand text-brand-foreground shadow-sm'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Bike className="h-3.5 w-3.5 shrink-0" />
            <span>Rider</span>
          </button>
        </div>

        {errorMessage && (
          <div className="mt-4 rounded-xl border border-alert/30 bg-alert/10 px-3.5 py-2.5 text-xs font-semibold text-alert">
            {errorMessage}
          </div>
        )}

        {resetSent && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-brand/30 bg-brand-soft px-3.5 py-2.5 text-xs font-bold text-ink">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
            <span>Reset code sent to {emailOrPhone}. Check your inbox or SMS.</span>
          </div>
        )}

        {/* =========================================================
            FORM: SIGN IN vs CREATE ACCOUNT
        ========================================================= */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {mode === 'register' ? (
            <>
              {role === 'vendor_partner' && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                    Restaurant / Kitchen Name
                  </label>
                  <input
                    required
                    type="text"
                    value={kitchenName}
                    onChange={(e) => setKitchenName(e.target.value)}
                    placeholder="e.g. Mama Put & Grill House"
                    className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base font-medium text-ink focus:border-brand focus:outline-none sm:text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                  {role === 'vendor_partner' ? 'Manager Full Name' : 'Full Name'}
                </label>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Adaeze Okafor"
                  className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base font-medium text-ink focus:border-brand focus:outline-none sm:text-sm"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base font-medium text-ink focus:border-brand focus:outline-none sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base font-medium text-ink focus:border-brand focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              {role !== 'customer' && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                    {role === 'vendor_partner' ? 'Kitchen Zone' : 'Preferred Delivery Zone'}
                  </label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base font-bold text-ink focus:border-brand focus:outline-none sm:text-sm"
                  >
                    {PRESET_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.area}>
                        {loc.area}, {loc.city}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          ) : (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                Email or Phone Number
              </label>
              <input
                required
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="you@example.com or +234..."
                className="mt-1 w-full rounded-control border border-line-strong bg-surface px-3.5 py-2.5 text-base font-medium text-ink focus:border-brand focus:outline-none sm:text-sm"
              />
            </div>
          )}

          {/* Password Field (shared) */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                Password
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-brand hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative mt-1">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  mode === 'register' ? 'Create a password (min. 6 chars)' : 'Enter your password'
                }
                className="w-full rounded-control border border-line-strong bg-surface py-2.5 pl-3.5 pr-10 text-base font-medium text-ink focus:border-brand focus:outline-none sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-brand py-3.5 text-sm font-extrabold text-brand-foreground shadow-brand transition hover:bg-brand-hover"
          >
            {mode === 'login'
              ? role === 'customer'
                ? 'Sign In to Vinoli'
                : 'Sign In to Partner Portal →'
              : role === 'vendor_partner'
                ? 'Register Partner Kitchen →'
                : role === 'dispatcher'
                  ? 'Create Rider Account →'
                  : 'Create Vinoli Account'}
          </button>
        </form>

        {/* Bottom Switcher */}
        <p className="mt-5 border-t border-line pt-4 text-center text-xs font-medium text-ink-muted">
          {mode === 'login' ? (
            <>
              New to Vinoli?{' '}
              <button
                type="button"
                onClick={() => switchMode('register')}
                className="font-extrabold text-brand hover:underline"
              >
                Create a free account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="font-extrabold text-brand hover:underline"
              >
                Sign in instead
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export const AuthModal = LoginModal;
export default LoginModal;
