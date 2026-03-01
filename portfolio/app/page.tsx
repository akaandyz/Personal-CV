'use client';
import { useState } from 'react';
import CocoaGate from '@/components/CocoaGate';
import PageLayout from '@/components/PageLayout';
import TopSection from '@/components/sections/TopSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

import skills from '@/content/skills.json';
import experience from '@/content/experience.json';
import projects from '@/content/projects.json';

export default function Home() {
  const [hasVerified, setHasVerified] = useState(false);
  return (
    <>
      {!hasVerified && <CocoaGate onComplete={() => setHasVerified(true)} />}
      <PageLayout>
        <TopSection />
        <AboutSection />
        <SkillsSection groups={skills.groups} />
        <ExperienceSection roles={experience.roles} education={experience.education} certifications={experience.certifications} />
        <ProjectsSection projects={projects.projects} />
        <ContactSection />
      </PageLayout>
    </>
  );
}
