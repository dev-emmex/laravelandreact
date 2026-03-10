import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import '../assets/style.css';

const Landingpage = () => {
  return (
    <div className="landing-page">
      <Nav />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Platform</h1>
          <p className="hero-subtitle">
            Create, manage, and share your posts with the world. 
            Join our community of writers and content creators today.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-hero btn-primary-hero">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-hero btn-secondary-hero">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Easy Content Management</h3>
              <p>Create and edit your posts with our intuitive editor. 
              Format your content your way with powerful editing tools.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Performance</h3>
              <p>Experience lightning-fast loading times and smooth 
              interactions with our optimized platform.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your data is safe with us. We use industry-standard 
              security to protect your content and account.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Engage Your Audience</h3>
              <p>Build a community around your content. Share your 
              ideas and connect with readers worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of creators who are already sharing their stories.</p>
          <Link to="/register" className="btn btn-cta">
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2026 Our Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landingpage;

