
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../assets/style.css';

const Nav = ({ name, setName }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Define menu variable with if statement
  let menu;
  
  if (!name) {
    // User is not logged in - show Login and Register
    menu = (
      <>
        <li className="nav-item"> 
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item"> 
          <Link to="/register" className="nav-link">Register</Link>
        </li>
      </>
    );
  } else {
    // User is logged in - show Welcome and Logout
    menu = (
      <>
        <li className="nav-item"> 
          <span className="nav-link" style={{ color: '#fff' }}>Welcome, {name}</span>
        </li>
        <li className="nav-item"> 
          <Link 
            to="/login" 
            className={`nav-link ${isLoggingOut ? 'disabled' : ''}`} 
            style={{ pointerEvents: isLoggingOut ? 'none' : 'auto' }}
            onClick={async (e) => {
              e.preventDefault();
              if (isLoggingOut) return;
              
              setIsLoggingOut(true);
              try {
                await api.post("/logout");
                setName(''); // Reset name state to show Login/Register
                navigate('/login');
              } catch (err) {
                console.error('Logout error:', err);
                alert('Logout failed. Please try again.');
              } finally {
                setIsLoggingOut(false);
              }
            }}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Link>
        </li>
      </>
    );
  }

  return (
     <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid"> 
          <Link to={name ? "/home" : "/"} className="navbar-brand" >Home</Link>

          <div >
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {menu}
            </ul>
          </div>
        </div>
      </nav>
   )
}

export default Nav

