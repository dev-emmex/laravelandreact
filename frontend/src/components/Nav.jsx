import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../assets/style.css';

const Nav = ({ name, setName }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  let menu;

  if (!name) {
    menu = (
      <>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <i className="bi bi-box-arrow-in-right me-1"></i>Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            <i className="bi bi-person-plus me-1"></i>Register
          </Link>
        </li>
      </>
    );
  } else {
    menu = (
      <>
        <li className="nav-item">
          <span className="nav-link nav-welcome">
            <span className="nav-avatar">{name.charAt(0)}</span>
            {name}
          </span>
        </li>
        <li className="nav-item">
          <Link
            to="/login"
            className={`nav-link nav-logout ${isLoggingOut ? 'disabled' : ''}`}
            style={{ pointerEvents: isLoggingOut ? 'none' : 'auto' }}
            onClick={async (e) => {
              e.preventDefault();
              if (isLoggingOut) return;
              setIsLoggingOut(true);
              try {
                await api.post("/logout");
                setName('');
                navigate('/login');
              } catch (err) {
                console.error('Logout error:', err);
              } finally {
                setIsLoggingOut(false);
              }
            }}
          >
            {isLoggingOut
              ? <><i className="bi bi-arrow-repeat me-1"></i>Logging out...</>
              : <><i className="bi bi-box-arrow-right me-1"></i>Logout</>
            }
          </Link>
        </li>
      </>
    );
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container-fluid px-4">
        <Link to={name ? "/home" : "/"} className="navbar-brand">
          <i className="bi bi-layers-fill"></i>
          Postify
        </Link>
        <div>
          <ul className="navbar-nav flex-row gap-1 align-items-center">
            {menu}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
