import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ cart, user, setUser, wishlist = [] }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ✅ clear token
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="logo">Readify</Link>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;