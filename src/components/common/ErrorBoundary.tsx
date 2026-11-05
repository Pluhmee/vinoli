import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || 'An unexpected error occurred.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[Vinoli ErrorBoundary]', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, errorMessage: null });
    window.location.assign('/');
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
          <div className="max-w-md rounded-card border border-line bg-surface-elevated p-8 shadow-soft">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-alert">
              Application Error
            </p>
            <h1 className="mt-2 font-display text-xl font-extrabold text-ink">
              Something interrupted the view
            </h1>
            <p className="mt-2 text-sm text-ink-muted">{this.state.errorMessage}</p>
            <button
              type="button"
              onClick={this.handleReset}
              className="mt-6 inline-flex items-center justify-center rounded-control bg-brand px-5 py-2.5 text-sm font-extrabold text-brand-foreground transition hover:bg-brand-hover"
            >
              Reload Vinoli
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
