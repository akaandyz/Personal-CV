'use client';

import { scrollToSection } from '@/lib/scrollToSection';

export default function TopSection() {
  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.14;
    // No transition during tracking — instant magnetic follow
    el.style.transition = 'box-shadow 0.25s ease';
    el.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
  }

  function onMouseLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = e.currentTarget;
    // Spring back on leave
    el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.25s ease';
    el.style.transform = '';
  }

  return (
    <section id="top" className="hero-section">
      <div>
        <p className="hero-eyebrow">Hi, I&apos;m</p>
        {/* tabIndex={-1} — receives programmatic focus from nav click */}
        <h1 className="hero-name" tabIndex={-1}>
          Your Name
        </h1>
        <p className="hero-role">Software Engineer · Builder · Creator</p>
        <p className="hero-tagline">
          I build things for the web. Focused on clean code, thoughtful UX,
          and turning ideas into real products.
        </p>
        <a
          href="#projects"
          className="cta-btn"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
        >
          View my work
        </a>
      </div>
    </section>
  );
}
