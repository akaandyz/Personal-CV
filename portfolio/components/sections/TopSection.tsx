'use client';

import { ArrowRight } from 'lucide-react';
import { scrollToSection } from '@/lib/scrollToSection';

export default function TopSection() {
  return (
    <section id="top" className="bento-section bento-section-first">
      <div className="bento-grid">
        {/* Intro card */}
        <div className="b-card b-card-dark b-span-7">
          <div className="b-intro-badge">
            <span className="b-intro-badge-dot" aria-hidden="true" />
            Available for opportunities
          </div>
          <h1 className="b-intro-title" tabIndex={-1}>
            Andy Zheng
          </h1>
          <p className="b-intro-sub">
            Data Scientist &amp; AI/ML Engineer &nbsp;·&nbsp; Senior Technology Consultant
          </p>
          <a
            href="#projects"
            className="b-cta-btn"
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
          >
            View my work
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Photo / avatar card */}
        <div className="b-card b-photo-bg b-span-5" aria-hidden="true">
          <div className="b-avatar">AZ</div>
        </div>

        {/* Stat tiles */}
        <div className="b-card b-card-blue b-span-3">
          <span className="b-big-num">6+</span>
          <span className="b-num-label">Years Experience</span>
        </div>

        <div className="b-card b-card-navy b-span-3">
          <span className="b-big-num">20+</span>
          <span className="b-num-label">Projects Delivered</span>
        </div>

        <div className="b-card b-card-green b-span-3">
          <span className="b-big-num">50%</span>
          <span className="b-num-label">Faster Policy Response</span>
        </div>

        <div
          className="b-card b-span-3"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
        >
          <span style={{ fontSize: '1.75rem' }}>🏅</span>
          <span className="b-num-label" style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
            3× Azure Certified
          </span>
        </div>
      </div>
    </section>
  );
}
