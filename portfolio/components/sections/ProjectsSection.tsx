'use client';

import { useState, useMemo } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import FeaturedProject from '@/components/FeaturedProject';
import type { Project } from '@/components/FeaturedProject';

// ── ProjectCard ───────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    // Suppress transform transition while tracking for instant response
    el.style.transition = 'border-color 0.15s, box-shadow 0.15s';
    el.style.setProperty('--rx', `${-y * 5}deg`);
    el.style.setProperty('--ry', `${x * 5}deg`);
  }

  function onPointerLeave(e: React.PointerEvent<HTMLElement>) {
    const el = e.currentTarget;
    // Restore spring-back transition on leave
    el.style.transition = 'border-color 0.15s, box-shadow 0.15s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  return (
    <article className="project-card" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <header>
        <h3 className="project-card-title">{project.title}</h3>
      </header>

      <p className="project-card-desc">{project.description}</p>

      <ul
        role="list"
        aria-label="Technologies"
        className="project-card-tags"
        style={{ margin: 0, padding: 0, listStyle: 'none' }}
      >
        {project.tags.map((tag) => (
          <li key={tag}>
            <span className="skill-tag">{tag}</span>
          </li>
        ))}
      </ul>

      <div className="project-card-links">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <Github size={13} aria-hidden="true" />
          Code
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <ExternalLink size={13} aria-hidden="true" />
            Live
          </a>
        )}
      </div>
    </article>
  );
}

// ── ProjectsSection ───────────────────────────────────────────────────

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const featured = useMemo(() => projects.filter((p) => p.featured), [projects]);

  // Collect every unique tag across all projects, sorted alphabetically
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  // When a filter is active show all matching projects.
  // When no filter, show non-featured projects (featured are shown in the hero above).
  const displayed = useMemo(
    () =>
      activeTag
        ? projects.filter((p) => p.tags.includes(activeTag))
        : projects.filter((p) => !p.featured),
    [projects, activeTag],
  );

  function toggle(tag: string) {
    setActiveTag((prev) => (prev === tag ? null : tag));
  }

  const resultLabel =
    displayed.length === 0
      ? 'No projects match this filter.'
      : `Showing ${displayed.length} project${displayed.length !== 1 ? 's' : ''}${activeTag ? ` tagged "${activeTag}"` : ''}.`;

  return (
    <section id="projects" className="section">
      <h2 className="section-heading" tabIndex={-1}>
        Projects
      </h2>

      {/* ── Featured hero cards ─────────────────────────────────────
           Hidden when a tag filter is active so the view stays focused. */}
      {featured.length > 0 && !activeTag && (
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}
          aria-label="Featured projects"
        >
          {featured.map((p) => (
            <FeaturedProject key={p.id} project={p} />
          ))}
        </div>
      )}

      {/* ── Filter bar ──────────────────────────────────────────────
           role="group" groups the buttons for AT without a landmark role. */}
      <div role="group" aria-label="Filter projects by technology" className="filter-bar">
        <button
          className="filter-btn"
          aria-pressed={activeTag === null}
          onClick={() => setActiveTag(null)}
        >
          All
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            className="filter-btn"
            aria-pressed={activeTag === tag}
            onClick={() => toggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Live region announces filter result count to screen readers */}
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}
      >
        {resultLabel}
      </p>

      {/* ── Grid ────────────────────────────────────────────────────
           ul + display:contents on li lets project-card be the grid child. */}
      {displayed.length > 0 ? (
        <ul
          className="project-grid"
          role="list"
          style={{ margin: 0, padding: 0, listStyle: 'none' }}
        >
          {displayed.map((p) => (
            <li key={p.id} style={{ display: 'contents' }}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
          No projects match the selected filter.
        </p>
      )}
    </section>
  );
}
