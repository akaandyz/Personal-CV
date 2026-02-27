'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Home, User, Zap, Briefcase, Code, Mail,
  Menu, X, Sun, Moon,
} from 'lucide-react';
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

export default function MobileNav({ activeSection, theme, onNavClick, onThemeToggle }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Focus trap + Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const getFocusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );

    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    hamburgerRef.current?.focus();
  }

  function handleNavClick(id: SectionId) {
    setIsOpen(false);
    onNavClick(id);
  }

  return (
    <>
      {/* Fixed top bar */}
      <div className="mobile-topbar">
        <span className="mobile-logo">AK</span>
        <button
          ref={hamburgerRef}
          className="icon-btn"
          aria-expanded={isOpen}
          aria-controls="mobile-drawer"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => (isOpen ? close() : setIsOpen(true))}
        >
          {isOpen
            ? <X size={20} aria-hidden="true" />
            : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={`drawer-backdrop${isOpen ? ' open' : ''}`}
        aria-hidden="true"
        onClick={close}
      />

      {/* Drawer */}
      <nav
        ref={drawerRef}
        id="mobile-drawer"
        className={`drawer${isOpen ? ' open' : ''}`}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <div className="drawer-header">
          <span className="mobile-logo">AK</span>
          <button
            className="icon-btn"
            style={{ border: 'none' }}
            aria-label="Close navigation menu"
            onClick={close}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="sidebar-nav" style={{ flex: 1 }}>
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-item"
              aria-current={activeSection === id ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(id);
              }}
            >
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </div>

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
            {theme === 'bjork-minimal'
              ? <Sun size={14} aria-hidden="true" />
              : <Moon size={14} aria-hidden="true" />}
            <span>{theme === 'bjork-minimal' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
