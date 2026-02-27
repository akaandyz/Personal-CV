import { Mail, Github, Linkedin, Download } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <h2 className="section-heading" tabIndex={-1}>
        Contact
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '34rem', lineHeight: 1.85 }}>
        Open to new opportunities and conversations. Reach out via any of the
        links below.
      </p>

      <div className="contact-links">
        <a href="mailto:you@example.com" className="contact-link">
          <Mail size={20} aria-hidden="true" />
          you@example.com
        </a>
        <a
          href="https://github.com/TODO"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <Github size={20} aria-hidden="true" />
          github.com/TODO
        </a>
        <a
          href="https://linkedin.com/in/TODO"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <Linkedin size={20} aria-hidden="true" />
          linkedin.com/in/TODO
        </a>
      </div>

      <a
        href="/resume.pdf"
        download
        className="resume-btn"
        aria-label="Download resume as PDF"
      >
        <Download size={15} aria-hidden="true" />
        Download Resume PDF
      </a>

      <p style={{
        marginTop: '4rem',
        fontSize: '0.75rem',
        color: 'var(--text-secondary)',
        letterSpacing: '0.04em',
      }}>
        Last updated: January 2025
      </p>
    </section>
  );
}
