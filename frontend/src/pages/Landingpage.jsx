import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import '../assets/style.css';

const features = [
  {
    icon: "bi-pencil-square",
    title: "Easy Content Management",
    desc: "Create, edit, and organize your posts with a clean and intuitive interface designed for efficiency."
  },
  {
    icon: "bi-rocket-takeoff-fill",
    title: "Blazing Fast Performance",
    desc: "Built on React and Laravel — lightning-fast interactions and real-time updates powered by modern tech."
  },
  {
    icon: "bi-shield-lock-fill",
    title: "Secure & Private",
    desc: "Industry-standard security with cookie-based sessions and strict input validation at every layer."
  },
  {
    icon: "bi-bar-chart-line-fill",
    title: "Status Tracking",
    desc: "Manage draft, published, and archived posts. Stay in control of your content publishing pipeline."
  }
];

const Landingpage = () => {
  return (
    <div className="landing-page">
      <Nav />

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <i className="bi bi-stars"></i>
             Post Management Platform
          </div>

          <h1 className="hero-title">
            Create. Manage.<br />
            <span className="gradient-text">Publish.</span>
          </h1>

          <p className="hero-subtitle">
            A powerful workspace for writers and content creators.
            Draft, organize, and publish your stories — all in one beautiful place.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn-hero-primary">
              <i className="bi bi-arrow-right-circle-fill"></i>
              Get Started Free
            </Link>
            <Link to="/login" className="btn-hero-secondary">
              <i className="bi bi-box-arrow-in-right"></i>
              Sign In
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">5</div>
              <div className="hero-stat-label">Categories</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">3</div>
              <div className="hero-stat-label">Post States</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">100%</div>
              <div className="hero-stat-label">Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-eyebrow">Why Postify</span>
          <h2 className="section-title">Everything you need to create great content</h2>
          <p className="section-desc">A complete suite of tools built for modern content creators and writers.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon-wrap">
                <i className={`bi ${f.icon}`}></i>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to start writing?</h2>
          <p>Join the community of creators and start publishing your stories today. It's completely free to get started.</p>
          <Link to="/register" className="btn-hero-primary">
            <i className="bi bi-person-plus-fill"></i>
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2026 Postify. Built with React &amp; Laravel.</p>
      </footer>
    </div>
  );
};

export default Landingpage;
