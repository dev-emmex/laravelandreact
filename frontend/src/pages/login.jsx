import {useState} from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api/api';
import '../assets/style.css';
import Nav from '../components/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const sanitizeInput = (input) => {
    // Basic XSS prevention - remove script tags and event handlers
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    // Validate email format
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

  }

  if (redirect) {
      return <Navigate to="/home" />
    }

  return (
     <div>
      <Nav />
      <main className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">
            Please sign in
          </h1>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <input type="email" className="form-control" id="floatingInput" placeholder="Email" required onChange={
            e => setEmail(e.target.value)
          }/>
<div className="password-input-group">
            <input 
              type={showPassword ? "text" : "password"} 
              className="form-control" 
              id="floatingPassword" 
              placeholder="Password" 
              required 
              onChange={
                e => setPassword(e.target.value)
              }
            />
            <button 
              type="button" 
              className="btn btn-outline-secondary password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
            </button>
          </div>
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="checkDefault" 
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="checkDefault">Remember me</label>
       
          <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
      </main>
    </div>
  )
}

export default Login
