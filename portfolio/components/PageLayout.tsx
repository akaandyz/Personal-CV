'use client';

import { useScrollspy } from '@/hooks/useScrollspy';
import { useTheme } from '@/hooks/useTheme';
import { scrollToSection } from '@/lib/scrollToSection';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import type { SectionId } from '@/hooks/useScrollspy';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useScrollspy();
  const [theme, setTheme] = useTheme();

  function handleNavClick(id: SectionId) {
    // Update highlight immediately — don't wait for IntersectionObserver
    setActiveSection(id);
    scrollToSection(id);
  }

  function toggleTheme() {
    setTheme(theme === 'bjork-minimal' ? 'bjork-light-surreal' : 'bjork-minimal');
  }

  return (
    <div className="page-layout">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Sidebar
        activeSection={activeSection}
        theme={theme}
        onNavClick={handleNavClick}
        onThemeToggle={toggleTheme}
      />

      <MobileNav
        activeSection={activeSection}
        theme={theme}
        onNavClick={handleNavClick}
        onThemeToggle={toggleTheme}
      />

      <main id="main-content" className="main-content" role="main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
