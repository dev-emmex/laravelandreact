import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import api from "../api/api";
import Nav from "../components/Nav";
import '../assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

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

    if (!trimmedName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Password and confirmation do not match");
      return;
    }

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
      // Handle validation errors (422) from backend
      if (err.response?.status === 422) {
        const validationErrors = err.response.data.errors;
        if (validationErrors) {
          // Get first validation error message
          const firstError = Object.values(validationErrors)[0][0];
          setError(firstError);
        } else {
          setError(err.response.data.message || "Validation failed");
        }
      } else if (err.response?.status === 429) {
        setError(err.response.data.message || "Too many registration attempts. Please try again later.");
      } else {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Nav />
      <main className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <input
            type="text"
            className="form-control"
            id="registerName"         // unique ID
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="form-control"
            id="registerEmail"        // unique ID
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
<div className="password-input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="registerPassword"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              className="btn btn-outline-secondary password-toggle-btn"
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
              placeholder="Confirm Password"
              required
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button 
              type="button" 
              className="btn btn-outline-secondary password-toggle-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
            </button>
          </div>

          <button
            className="btn btn-primary w-100 py-2"
            type="submit"
            disabled={loading}        // prevent double-submit
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;