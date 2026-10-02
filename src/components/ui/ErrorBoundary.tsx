import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in SMS Events and Decors app:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public handleReload = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#C5A880]/40 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#141414] text-[#C5A880] flex items-center justify-center mx-auto text-xl font-serif font-bold">
              SMS
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
              Something unexpected happened
            </h2>
            <p className="text-xs text-stone-600">
              {this.state.error?.message || 'An error occurred while loading the application.'}
            </p>

            <button
              onClick={this.handleReload}
              className="px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#B39162] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 mx-auto shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset & Reload App</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
