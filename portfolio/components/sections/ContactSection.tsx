import { Mail, Github, Linkedin, Download } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="bento-section bento-section-last">
      <div className="bento-grid">
        <div className="b-card b-card-dark b-span-12">
          <div className="b-contact-inner">
            <div>
              <p className="b-contact-msg">Open to new opportunities →</p>
              <p className="b-contact-email">akaandyzheng@gmail.com</p>
              <div className="b-contact-actions">
                <a href="mailto:akaandyzheng@gmail.com" className="b-contact-btn">
                  <Mail size={15} aria-hidden="true" />
                  Send Email
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="b-contact-btn-ghost"
                  aria-label="Download resume as PDF"
                >
                  <Download size={15} aria-hidden="true" />
                  Download CV
                </a>
              </div>
            </div>
          </div>

          <div className="b-contact-socials">
            <a
              href="https://github.com/akaandyz"
              target="_blank"
              rel="noopener noreferrer"
              className="b-contact-social"
            >
              <Github size={15} aria-hidden="true" />
              github.com/akaandyz
            </a>
            <a
              href="https://linkedin.com/in/andy-zheng-43b691159"
              target="_blank"
              rel="noopener noreferrer"
              className="b-contact-social"
            >
              <Linkedin size={15} aria-hidden="true" />
              linkedin.com/in/andy-zheng-43b691159
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
