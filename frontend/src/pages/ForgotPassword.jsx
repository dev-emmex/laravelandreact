import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import Nav from '../components/Nav';
import '../assets/style.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      await api.post('/forgot-password', { email: email.trim() });
      setSent(true);
    } catch (err) {
      if (err.response?.status === 429) {
        setError(err.response.data.message || 'Too many attempts. Please try again later.');
      } else {
        setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Nav />
      <div className="auth-body">
        <div className="auth-card">

          {sent ? (
            /* ── Success state ── */
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64,
                borderRadius: '50%',
                background: 'var(--success-dim)',
                border: '1px solid rgba(16,185,129,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '1.8rem', color: 'var(--success)'
              }}>
                <i className="bi bi-envelope-check-fill"></i>
              </div>
              <h1 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Check your inbox</h1>
              <p className="auth-subtitle" style={{ marginBottom: 28 }}>
                If <strong style={{ color: 'var(--text-primary)' }}>{email}</strong> is registered,
                you'll receive a password reset link shortly.
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                Didn't receive it? Check your spam folder or try again.
              </p>
              <button
                className="btn-premium"
                style={{ marginBottom: 0 }}
                onClick={() => { setSent(false); setEmail(''); }}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Try a different email
              </button>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <div className="auth-brand">
                <i className="bi bi-key-fill"></i>
              </div>
              <h1>Forgot password?</h1>
              <p className="auth-subtitle">
                Enter your email and we'll send you a reset link.
              </p>

              {error && (
                <div className="auth-alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  {error}
                </div>
              )}

              <form onSubmit={submit}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                />
                <button className="btn-premium" type="submit" disabled={loading}>
                  {loading
                    ? <><i className="bi bi-arrow-repeat me-2" style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}></i>Sending...</>
                    : <><i className="bi bi-send-fill me-2"></i>Send Reset Link</>
                  }
                </button>
              </form>

              <div className="auth-divider">
                <Link to="/login">
                  <i className="bi bi-arrow-left me-1"></i>Back to Sign In
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
