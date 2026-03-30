import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import api from '../api/api';
import Nav from '../components/Nav';
import '../assets/style.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const sanitizeInput = (input) =>
    input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '');

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    if (!validateEmail(sanitizedEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    try {
      await api.post("/login", {
        email: sanitizedEmail,
        password: sanitizedPassword,
        remember_me: rememberMe
      });
      setRedirect(true);
    } catch (err) {
      if (err.response?.status === 429) {
        setError(err.response.data.message || "Too many login attempts. Please try again later.");
      } else {
        setError(err.response?.data?.message || "Invalid email or password");
      }
    }
  };

  if (redirect) return <Navigate to="/home" />;

  return (
    <div className="auth-page">
      <Nav />
      <div className="auth-body">
        <div className="auth-card">
          <div className="auth-brand">
            <i className="bi bi-layers-fill"></i>
          </div>
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Sign in to your Postify account</p>

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
              required
              onChange={e => setEmail(e.target.value)}
            />

            <div className="password-input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                required
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div className="form-check" style={{ marginBottom: 0 }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                style={{ fontSize: '0.8rem', color: 'var(--primary-light)', textDecoration: 'none' }}
              >
                Forgot password?
              </Link>
            </div>

            <button className="btn-premium" type="submit">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Sign In
            </button>
          </form>

          <div className="auth-divider">
            Don't have an account? <Link to="/register">Create one free</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
