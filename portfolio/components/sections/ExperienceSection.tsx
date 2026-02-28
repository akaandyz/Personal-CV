interface Role {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  bullets: string[];
  tech?: string[];
}

interface Education {
  degree: string;
  institution: string;
  year: number;
}

function fmt(dateStr: string) {
  const [y, m] = dateStr.split('-');
  return new Date(+y, +m - 1).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export default function ExperienceSection({ roles, education }: { roles: Role[]; education?: Education[] }) {
  return (
    <section id="experience" className="section">
      <h2 className="section-heading" tabIndex={-1}>
        Experience
      </h2>

      {/* ol gives the timeline a proper ordered-list semantic */}
      <ol
        className="timeline"
        aria-label="Work history"
        style={{ margin: 0, padding: 0, listStyle: 'none' }}
      >
        {roles.map((role) => (
          <li key={role.id} className="timeline-item">
            <article>
              <header style={{ marginBottom: '0.75rem' }}>
                <p className="timeline-date">
                  <time dateTime={role.startDate}>{fmt(role.startDate)}</time>
                  {' – '}
                  {role.current ? (
                    <span>Present</span>
                  ) : role.endDate ? (
                    <time dateTime={role.endDate}>{fmt(role.endDate)}</time>
                  ) : null}
                  {' · '}
                  <span>{role.location}</span>
                </p>
                <h3 className="timeline-title">{role.title}</h3>
                <p className="timeline-company">{role.company}</p>
              </header>

              <ul
                aria-label="Responsibilities"
                style={{
                  paddingLeft: '1.125rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  margin: 0,
                }}
              >
                {role.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                    }}
                  >
                    {b}
                  </li>
                ))}
              </ul>

              {role.tech && role.tech.length > 0 && (
                <ul
                  role="list"
                  aria-label={`Technologies used at ${role.company}`}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginTop: '1rem',
                    padding: 0,
                    listStyle: 'none',
                  }}
                >
                  {role.tech.map((t) => (
                    <li key={t}>
                      <span className="skill-tag">{t}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>

      {education && education.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Education
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {education.map((ed, i) => (
              <li key={i} style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                <span style={{ fontWeight: 500 }}>{ed.degree}</span>
                <span style={{ color: 'var(--text-secondary)' }}> · {ed.institution} · {ed.year}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
