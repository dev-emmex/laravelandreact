import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import api from "../api/api";
import Nav from "../components/Nav";
import '../assets/style.css';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (pwd) => {
  if (pwd.length < 8)         return "Password must be at least 8 characters long";
  if (!/[A-Z]/.test(pwd))     return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(pwd))     return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(pwd))     return "Password must contain at least one number";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Password must contain at least one special character";
  return null;
};

const Register = () => {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const trimmedName  = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName)             { setError("Please enter your name"); return; }
    if (!validateEmail(trimmedEmail)) { setError("Please enter a valid email address"); return; }
    const passwordError = validatePassword(password);
    if (passwordError)            { setError(passwordError); return; }
    if (password !== passwordConfirmation) { setError("Passwords do not match"); return; }

    setLoading(true);
    try {
      await api.post("/register", {
        name: trimmedName,
        email: trimmedEmail,
        password,
        password_confirmation: passwordConfirmation,
      });
      setRedirect(true);
    } catch (err) {
      if (err.response?.status === 422) {
        const validationErrors = err.response.data.errors;
        if (validationErrors) {
          setError(Object.values(validationErrors)[0][0]);
        } else {
          setError(err.response.data.message || "Validation failed");
        }
      } else if (err.response?.status === 429) {
        setError(err.response.data.message || "Too many attempts. Please try again later.");
      } else {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (redirect) return <Navigate to="/login" />;

  return (
    <div className="auth-page">
      <Nav />
      <div className="auth-body">
        <div className="auth-card">
          <div className="auth-brand">
            <i className="bi bi-layers-fill"></i>
          </div>
          <h1>Create account</h1>
          <p className="auth-subtitle">Join Postify and start creating today</p>

          {error && (
            <div className="auth-alert">
              <i className="bi bi-exclamation-triangle-fill"></i>
              {error}
            </div>
          )}

          <form onSubmit={submit}>
            <input
              type="text"
              className="form-control"
              id="registerName"
              placeholder="Full name"
              required
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              className="form-control"
              id="registerEmail"
              placeholder="Email address"
              required
              onChange={e => setEmail(e.target.value)}
            />
            <div className="password-input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="registerPassword"
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
            <div className="password-input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                id="registerPasswordConfirmation"
                placeholder="Confirm password"
                required
                onChange={e => setPasswordConfirmation(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </button>
            </div>

            <button className="btn-premium" type="submit" disabled={loading}>
              {loading
                ? <><i className="bi bi-arrow-repeat me-2" style={{display:'inline-block',animation:'spin 0.8s linear infinite'}}></i>Creating account...</>
                : <><i className="bi bi-person-plus-fill me-2"></i>Create Account</>
              }
            </button>
          </form>

          <div className="auth-divider">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
