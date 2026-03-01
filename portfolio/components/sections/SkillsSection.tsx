interface SkillGroup {
  label: string;
  items: string[];
}

const tagColorMap: Record<string, string> = {
  'AI & Machine Learning': 'b-tag-blue',
  'Cloud & MLOps': 'b-tag-blue',
  'Agentic AI & Dev Tools': 'b-tag-purple',
  'Visualization & BI': 'b-tag-green',
};

export default function SkillsSection({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="bento-section">
      <div className="bento-grid">
        <div className="b-card b-span-12">
          <h2 className="b-section-title" tabIndex={-1}>
            Skills &amp; Technologies
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            {groups.map((group) => {
              const labelId = `skills-group-${group.label.toLowerCase().replace(/\W+/g, '-')}`;
              const tagClass = tagColorMap[group.label] ?? '';
              return (
                <div key={group.label}>
                  <span className="b-eyebrow" id={labelId}>
                    {group.label}
                  </span>
                  <ul
                    role="list"
                    aria-labelledby={labelId}
                    className="b-tags"
                    style={{ margin: 0, padding: 0, listStyle: 'none' }}
                  >
                    {group.items.map((item) => (
                      <li key={item}>
                        <span className={`b-tag${tagClass ? ` ${tagClass}` : ''}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
