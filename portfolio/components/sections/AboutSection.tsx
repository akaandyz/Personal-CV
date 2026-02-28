export default function AboutSection() {
  return (
    <section id="about" className="section">
      <h2 className="section-heading" tabIndex={-1}>
        About
      </h2>
      <div style={{ maxWidth: '42rem' }}>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.0625rem' }}>
          Data Scientist Consultant with 6+ years in analytics, leveraging advanced machine
          learning and AI to drive transformative insights. Proficient in Python, SQL, and Azure
          AI tools, consistently delivering innovative solutions that optimize operations and
          enhance decision-making across diverse sectors.
        </p>
      </div>
    </section>
  );
}
