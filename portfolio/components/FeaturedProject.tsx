'use client';

import { Github, ExternalLink } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
  liveUrl: string | null;
  featured: boolean;
}

export default function FeaturedProject({ project }: { project: Project }) {
  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    el.style.transition = 'border-color 0.15s, box-shadow 0.15s';
    el.style.setProperty('--rx', `${-y * 4}deg`);
    el.style.setProperty('--ry', `${x * 4}deg`);
  }

  function onPointerLeave(e: React.PointerEvent<HTMLElement>) {
    const el = e.currentTarget;
    el.style.transition = 'border-color 0.15s, box-shadow 0.15s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  return (
    <article
      className="featured-project"
      aria-label={`Featured project: ${project.title}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <header>
        <span className="eyebrow">Featured project</span>
        <h3 className="featured-project-title">{project.title}</h3>
      </header>

      <p className="featured-project-desc">{project.description}</p>

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
          <Github size={14} aria-hidden="true" />
          Code
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Live demo
          </a>
        )}
      </div>
    </article>
  );
}
