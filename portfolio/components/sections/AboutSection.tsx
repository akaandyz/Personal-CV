export default function AboutSection() {
  return (
    <section id="about" className="section">
      <h2 className="section-heading" tabIndex={-1}>
        About
      </h2>
      <div style={{ maxWidth: '42rem' }}>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.0625rem' }}>
          Data Scientist and AI/ML Engineer with 6+ years delivering enterprise-scale machine
          learning, LLM applications, and analytics solutions across U.S. government healthcare and
          commercial sectors. Expert in NLP, RAG pipelines, predictive modeling, and agentic AI
          workflows. Led cross-functional teams of 3–20, managing 20+ high-impact projects
          end-to-end. Dual degree in Biomedical Engineering and Applied Mathematics &amp; Statistics.
        </p>

        <div className="stats-strip">
          <div className="stat-card">
            <span className="stat-number">6+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">20+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">3</span>
            <span className="stat-label">Azure Certs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
