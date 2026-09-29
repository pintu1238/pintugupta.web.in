'use client';

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function getInitialTheme(storedTheme: string | null, systemTheme: Theme = 'dark'): Theme {
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
  return systemTheme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // React uses the server snapshot for SSR and the first hydration render.
  const hydrated = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  const [preferredTheme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const systemTheme: Theme = window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    try {
      return getInitialTheme(window.localStorage.getItem('portfolio-theme'), systemTheme);
    } catch {
      return systemTheme;
    }
  });
  const theme = hydrated ? preferredTheme : 'dark';

  useEffect(() => {
    // Do not overwrite a saved preference with the temporary SSR default.
    if (!hydrated) return;
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem('portfolio-theme', theme);
    } catch {
      // In privacy modes the in-memory toggle remains usable without storage.
    }
  }, [hydrated, theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider.');
  return context;
}
