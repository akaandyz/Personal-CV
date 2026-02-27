'use client';

import { Home, User, Zap, Briefcase, Code, Mail, Sun, Moon } from 'lucide-react';
import type { Theme } from '@/hooks/useTheme';
import type { SectionId } from '@/hooks/useScrollspy';

const NAV_ITEMS = [
  { id: 'top'        as SectionId, label: 'Home',       Icon: Home },
  { id: 'about'      as SectionId, label: 'About',      Icon: User },
  { id: 'skills'     as SectionId, label: 'Skills',     Icon: Zap },
  { id: 'experience' as SectionId, label: 'Experience', Icon: Briefcase },
  { id: 'projects'   as SectionId, label: 'Projects',   Icon: Code },
  { id: 'contact'    as SectionId, label: 'Contact',    Icon: Mail },
];

interface Props {
  activeSection: SectionId;
  theme: Theme;
  onNavClick: (id: SectionId) => void;
  onThemeToggle: () => void;
}

export default function Sidebar({ activeSection, theme, onNavClick, onThemeToggle }: Props) {
  return (
    <aside className="sidebar" aria-label="Site navigation">
      <div className="sidebar-logo">AK</div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className="nav-item"
            aria-current={activeSection === id ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              onNavClick(id);
            }}
          >
            <Icon size={17} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label={
            theme === 'bjork-minimal'
              ? 'Switch to light theme'
              : 'Switch to dark theme'
          }
        >
          {theme === 'bjork-minimal' ? (
            <Sun size={14} aria-hidden="true" />
          ) : (
            <Moon size={14} aria-hidden="true" />
          )}
          <span>{theme === 'bjork-minimal' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </aside>
  );
}
