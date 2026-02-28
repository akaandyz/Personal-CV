import { Brain, Cloud, Code2, Bot, BarChart2, Building2 } from 'lucide-react';

interface SkillGroup {
  label: string;
  items: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  'AI & Machine Learning': <Brain size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />,
  'Cloud & MLOps': <Cloud size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />,
  'Programming & Data': <Code2 size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />,
  'Agentic AI & Dev Tools': <Bot size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />,
  'Visualization & BI': <BarChart2 size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />,
  'Domain Expertise': <Building2 size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />,
};

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
              <span
                className="eyebrow"
                id={labelId}
                style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              >
                {iconMap[group.label]}
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
