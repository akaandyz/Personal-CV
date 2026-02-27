interface SkillGroup {
  label: string;
  items: string[];
}

export default function SkillsSection({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="section">
      <h2 className="section-heading" tabIndex={-1}>
        Skills
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {groups.map((group) => {
          const labelId = `skills-group-${group.label.toLowerCase().replace(/\W+/g, '-')}`;
          return (
            <div key={group.label}>
              <span className="eyebrow" id={labelId}>
                {group.label}
              </span>
              {/* role="list" restores list semantics stripped by list-style:none */}
              <ul
                role="list"
                aria-labelledby={labelId}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                }}
              >
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="skill-tag">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
