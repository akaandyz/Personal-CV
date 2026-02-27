export default function AboutSection() {
  return (
    <section id="about" className="section">
      <h2 className="section-heading" tabIndex={-1}>
        About
      </h2>
      <div style={{ maxWidth: '42rem' }}>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.0625rem' }}>
          TODO: A short bio paragraph about you — your background, what you
          care about, and what drives your work. Keep it human and direct.
        </p>
      </div>
    </section>
  );
}
