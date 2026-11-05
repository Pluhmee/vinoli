import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          muted: 'rgb(var(--color-surface-muted) / <alpha-value>)',
          elevated: 'rgb(var(--color-surface-elevated) / <alpha-value>)',
          inverse: 'rgb(var(--color-surface-inverse) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          muted: 'rgb(var(--color-ink-muted) / <alpha-value>)',
          subtle: 'rgb(var(--color-ink-subtle) / <alpha-value>)',
          inverse: 'rgb(var(--color-ink-inverse) / <alpha-value>)',
        },
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
          hover: 'rgb(var(--color-brand-hover) / <alpha-value>)',
          soft: 'rgb(var(--color-brand-soft) / <alpha-value>)',
          foreground: 'rgb(var(--color-brand-foreground) / <alpha-value>)',
        },
        plum: {
          DEFAULT: 'rgb(var(--color-plum) / <alpha-value>)',
          soft: 'rgb(var(--color-plum-soft) / <alpha-value>)',
        },
        violet: {
          DEFAULT: 'rgb(var(--color-violet) / <alpha-value>)',
        },
        success: 'rgb(var(--color-success) / <alpha-value>)',
        alert: 'rgb(var(--color-alert) / <alpha-value>)',
        line: {
          DEFAULT: 'rgb(var(--color-line) / <alpha-value>)',
          strong: 'rgb(var(--color-line-strong) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        control: 'var(--radius-control)',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(42, 5, 77, 0.08)',
        elevated: '0 20px 45px -15px rgba(42, 5, 77, 0.14)',
        brand: '0 12px 28px -8px rgba(252, 123, 15, 0.42)',
      },
    },
  },
  plugins: [],
} satisfies Config;
