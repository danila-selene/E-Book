import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import BookDetail from './components/BookDetail';
import Wishlist from './components/Wishlist';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter(book => (book._id || book.id) !== bookId));
  };

  const addToWishlist = (book) => {
    if (!wishlist.find(item => (item._id || item.id) === (book._id || book.id))) {
      setWishlist([...wishlist, book]);
    }
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(wishlist.filter(book => (book._id || book.id) !== bookId));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={
            user ? <Home addToCart={addToCart} addToWishlist={addToWishlist} cart={cart} wishlist={wishlist} user={user} setUser={setUser} /> : <Navigate to="/login" />
          } />
          <Route path="/cart" element={
            user ? <Cart cart={cart} removeFromCart={removeFromCart} user={user} setUser={setUser} /> : <Navigate to="/login" />
          } />
          <Route path="/wishlist" element={
            user ? <Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} addToCart={addToCart} user={user} setUser={setUser} cart={cart} /> : <Navigate to="/login" />
          } />
          <Route path="/checkout" element={
            user ? <Checkout cart={cart} setCart={setCart} user={user} setUser={setUser} /> : <Navigate to="/login" />
          } />
          <Route path="/book/:id" element={
            user ? <BookDetail addToCart={addToCart} addToWishlist={addToWishlist} user={user} setUser={setUser} cart={cart} wishlist={wishlist} /> : <Navigate to="/login" />
          } />
          <Route path="/admin" element={<AdminLogin setUser={setUser} />} />
          <Route path="/admin/dashboard" element={
            user?.isAdmin ? <AdminDashboard user={user} setUser={setUser} /> : <Navigate to="/admin" />
          } />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;