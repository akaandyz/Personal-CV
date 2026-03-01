import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string | null;
  featured?: boolean;
}

const cardVariants = ['b-card-dark', 'b-card-darker', 'b-card-dark'] as const;

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="bento-section">
      <div className="bento-grid">
        <h2
          className="b-section-title"
          tabIndex={-1}
          style={{ gridColumn: 'span 12', paddingBottom: '8px' }}
        >
          Projects
        </h2>

        {projects.map((project, i) => {
          const isLast = i === projects.length - 1;
          const isOddTotal = projects.length % 2 !== 0;
          const spanClass = isOddTotal && isLast ? 'b-span-12' : 'b-span-6';
          const cardVariant = cardVariants[i % cardVariants.length];

          return (
            <article
              key={project.id}
              className={`b-card ${cardVariant} ${spanClass}`}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <p className="b-proj-label">Project {String(i + 1).padStart(2, '0')}</p>
              <h3 className="b-proj-title">{project.title}</h3>
              <p className="b-proj-desc">{project.description}</p>

              <ul
                role="list"
                aria-label="Technologies"
                className="b-proj-tags"
                style={{ margin: 0, padding: 0, listStyle: 'none' }}
              >
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <span className="b-proj-tag">{tag}</span>
                  </li>
                ))}
              </ul>

              {(project.repoUrl || project.liveUrl) && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1rem' }}>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="b-proj-link"
                    >
                      <Github size={13} aria-hidden="true" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="b-proj-link"
                    >
                      <ExternalLink size={13} aria-hidden="true" />
                      Live
                    </a>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
