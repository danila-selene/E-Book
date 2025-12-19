import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Wishlist({ wishlist, removeFromWishlist, addToCart, user, setUser, cart }) {
  return (
    <div>
      <Navbar cart={cart} wishlist={wishlist} user={user} setUser={setUser} />
      <div className="wishlist-container">
        <h2>My Wishlist</h2>
        {wishlist.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">♡</div>
            <h3>No Product</h3>
            <p>Go find the products you like</p>
            <Link to="/home" className="continue-btn">Browse Books</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((book) => (
              <div key={book._id || book.id} className="wishlist-item">
                <img src={book.image} alt={book.title} className="wishlist-cover" />
                <div className="wishlist-info">
                  <h3>{book.title}</h3>
                  <p>by {book.author}</p>
                  <p className="price">₹{book.price}</p>
                  <div className="wishlist-actions">
                    <button onClick={() => addToCart(book)}>Add to Cart</button>
                    <button onClick={() => removeFromWishlist(book._id || book.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;