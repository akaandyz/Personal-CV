'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export const SECTION_IDS = [
  'top',
  'about',
  'skills',
  'experience',
  'projects',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function useScrollspy(): [SectionId, (id: SectionId) => void] {
  const [activeId, setActiveId] = useState<SectionId>('top');
  const visible = useRef<Set<string>>(new Set());

  // Stable setter — also called directly by nav clicks for instant feedback
  const setActive = useCallback((id: SectionId) => setActiveId(id), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.current.add(entry.target.id);
          } else {
            visible.current.delete(entry.target.id);
          }
        });

        // Always prefer the topmost visible section (first in DOM order)
        const first = SECTION_IDS.find((id) => visible.current.has(id));
        if (first) setActive(first);
      },
      {
        // Section must be 40% in the active zone to qualify
        threshold: 0.4,
        // Clip viewport: ignore top 10% and bottom 50% — biases to top entry
        rootMargin: '-10% 0px -50% 0px',
      },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActive]);

  return [activeId, setActive];
}
