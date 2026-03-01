export default function AboutSection() {
  return (
    <section id="about" className="bento-section">
      <div className="bento-grid">
        <div className="b-card b-span-8">
          <h2 className="b-section-title" tabIndex={-1}>About</h2>
          <p className="b-about-text">
            Data Scientist and AI/ML Engineer with 6+ years delivering enterprise-scale machine
            learning, LLM applications, and analytics solutions across U.S. government healthcare and
            commercial sectors. Expert in NLP, RAG pipelines, predictive modeling, and agentic AI
            workflows. Led cross-functional teams of 3–20, managing 20+ high-impact projects
            end-to-end. Dual degree in Biomedical Engineering and Applied Mathematics &amp; Statistics.
          </p>
        </div>

        <div className="b-card b-span-4">
          <h2 className="b-section-title">Location &amp; Availability</h2>
          <p className="b-about-text">
            Based in New York, NY.
            <br /><br />
            Open to remote, hybrid, or on-site roles in data science, AI/ML engineering, or
            technology consulting.
          </p>
        </div>
      </div>
    </section>
  );
}
