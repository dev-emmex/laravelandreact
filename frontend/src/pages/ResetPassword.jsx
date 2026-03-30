import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import Nav from '../components/Nav';
import '../assets/style.css';

const validatePassword = (pwd) => {
  if (pwd.length < 8)                           return 'Password must be at least 8 characters long';
  if (!/[A-Z]/.test(pwd))                       return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(pwd))                       return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(pwd))                       return 'Password must contain at least one number';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd))     return 'Password must contain at least one special character';
  return null;
};

const ResetPassword = () => {
  const [searchParams]  = useSearchParams();
  const navigate        = useNavigate();
  const token           = searchParams.get('token') || '';
  const emailFromUrl    = searchParams.get('email') || '';

  const [password, setPassword]                   = useState('');
  const [passwordConfirmation, setPasswordConf]   = useState('');
  const [showPassword, setShowPassword]           = useState(false);
  const [showConfirm, setShowConfirm]             = useState(false);
  const [loading, setLoading]                     = useState(false);
  const [error, setError]                         = useState('');
  const [success, setSuccess]                     = useState(false);

  const invalidLink = !token;

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    const passwordError = validatePassword(password);
    if (passwordError) { setError(passwordError); return; }
    if (password !== passwordConfirmation) { setError('Passwords do not match'); return; }

    setLoading(true);
    try {
      await api.post('/reset-password', {
        token,
        email: emailFromUrl,
        password,
        password_confirmation: passwordConfirmation,
      });
      setSuccess(true);
    } catch (err) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        setError(errors ? Object.values(errors)[0][0] : err.response.data.message || 'Validation failed');
      } else if (err.response?.status === 429) {
        setError(err.response.data.message || 'Too many attempts. Please try again later.');
      } else {
        setError(err.response?.data?.message || 'This reset link is invalid or has expired.');
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

          {/* ── Invalid / missing token ── */}
          {invalidLink && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'var(--danger-dim)',
                border: '1px solid rgba(239,68,68,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', fontSize: '1.8rem', color: 'var(--danger)'
              }}>
                <i className="bi bi-x-circle-fill"></i>
              </div>
              <h1 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Invalid reset link</h1>
              <p className="auth-subtitle" style={{ marginBottom: 28 }}>
                This password reset link is missing or malformed.
                Please request a new one.
              </p>
              <Link to="/forgot-password" className="btn-premium" style={{ display: 'inline-flex' }}>
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Request New Link
              </Link>
            </div>
          )}

          {/* ── Success state ── */}
          {!invalidLink && success && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'var(--success-dim)',
                border: '1px solid rgba(16,185,129,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', fontSize: '1.8rem', color: 'var(--success)'
              }}>
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <h1 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Password updated!</h1>
              <p className="auth-subtitle" style={{ marginBottom: 28 }}>
                Your password has been reset successfully.
                You can now sign in with your new password.
              </p>
              <button
                className="btn-premium"
                onClick={() => navigate('/login')}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Go to Sign In
              </button>
            </div>
          )}

          {/* ── Form state ── */}
          {!invalidLink && !success && (
            <>
              <div className="auth-brand">
                <i className="bi bi-shield-lock-fill"></i>
              </div>
              <h1>Reset password</h1>
              <p className="auth-subtitle">Enter your new password below.</p>

              {error && (
                <div className="auth-alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  {error}
                </div>
              )}

              <form onSubmit={submit}>
                <div className="password-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="New password"
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                  </button>
                </div>

                <div className="password-input-group">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Confirm new password"
                    value={passwordConfirmation}
                    required
                    onChange={e => setPasswordConf(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    <i className={showConfirm ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                  </button>
                </div>

                {/* Password requirements hint */}
                <ul style={{
                  listStyle: 'none', padding: 0, margin: '4px 0 18px',
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px'
                }}>
                  {[
                    { test: password.length >= 8,                     label: '8+ characters' },
                    { test: /[A-Z]/.test(password),                   label: 'Uppercase letter' },
                    { test: /[a-z]/.test(password),                   label: 'Lowercase letter' },
                    { test: /[0-9]/.test(password),                   label: 'Number' },
                    { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), label: 'Special character' },
                  ].map(({ test, label }) => (
                    <li key={label} style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontSize: '0.72rem',
                      color: test ? 'var(--success)' : 'var(--text-muted)'
                    }}>
                      <i className={`bi ${test ? 'bi-check-circle-fill' : 'bi-circle'}`}
                        style={{ fontSize: '0.65rem' }}></i>
                      {label}
                    </li>
                  ))}
                </ul>

                <button className="btn-premium" type="submit" disabled={loading}>
                  {loading
                    ? <><i className="bi bi-arrow-repeat me-2" style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}></i>Updating...</>
                    : <><i className="bi bi-shield-check me-2"></i>Reset Password</>
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

export default ResetPassword;
