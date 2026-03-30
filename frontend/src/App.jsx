import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Createnewpost from './pages/Createnewpost.jsx'
import Editpost from './pages/Editpost.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'   
import Landingpage from './pages/Landingpage.jsx'
import { useState, useEffect } from 'react';

// Auth Guard Component - protects routes requiring authentication
function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        
        if (response.ok) {
          const data = await response.json();
          // AuthController returns { user: { id, name, email } }
          setIsAuthenticated(!!data.user?.name);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function App() {

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/reset-password' element={<ResetPassword />}/>
        <Route path='/home' element={<AuthGuard><Home /></AuthGuard>} />
        <Route path='/create-new-post' element={<AuthGuard><Createnewpost /></AuthGuard>}/>
        <Route path='/edit-post/:id' element={<AuthGuard><Editpost /></AuthGuard>}/>
      </Routes>

    </>

  )
}

export default App

