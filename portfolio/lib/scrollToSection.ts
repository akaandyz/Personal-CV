import type { SectionId } from '@/hooks/useScrollspy';

export function scrollToSection(id: SectionId | string): void {
  const section = document.getElementById(id);
  if (!section) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  section.scrollIntoView({ block: 'start', behavior: reduced ? 'instant' : 'smooth' });

  // Focus the first heading so keyboard/SR users land in the right place.
  // preventScroll keeps the heading from fighting the scroll animation.
  const heading = section.querySelector<HTMLElement>('h1, h2, h3');
  if (!heading) return;

  const delay = reduced ? 0 : 420;
  setTimeout(() => heading.focus({ preventScroll: true }), delay);
}
