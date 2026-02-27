'use client';

import { useState, useEffect } from 'react';

export type Theme = 'bjork-minimal' | 'bjork-light-surreal';

const VALID: Theme[] = ['bjork-minimal', 'bjork-light-surreal'];

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'bjork-minimal';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'bjork-minimal'
    : 'bjork-light-surreal';
}

export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>('bjork-minimal');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme') as Theme | null;
      if (stored && VALID.includes(stored)) {
        setThemeState(stored);
        return;
      }
    } catch {}
    // No stored preference — honour OS color scheme
    const sys = getSystemTheme();
    setThemeState(sys);
    document.documentElement.setAttribute('data-theme', sys);
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    try {
      localStorage.setItem('theme', t);
    } catch {}
    document.documentElement.setAttribute('data-theme', t);
  }

  return [theme, setTheme];
}
