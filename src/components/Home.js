import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Home({ addToCart, addToWishlist, cart, wishlist, user, setUser }) {
  const [booksByCategory, setBooksByCategory] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books'); // ✅ proxy forwards to backend
        const data = await response.json();
        setBooksByCategory(data); // backend should return { Fiction: [...], Romance: [...], ... }
      } catch (err) {
        console.error('Failed to fetch books:', err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <Navbar cart={cart} wishlist={wishlist} user={user} setUser={setUser} />
      <div className="home-container">
        {Object.entries(booksByCategory).map(([category, books]) => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="books-grid">
              {books.map(book => (
                <div key={book._id || book.id} className="book-card">
                  <div className="book-image-container">
                    <Link to={`/book/${book._id || book.id}`}>
                      <img src={book.image} alt={book.title} className="book-cover" />
                    </Link>
                    <button
                      className="wishlist-btn"
                      onClick={() => addToWishlist(book)}
                      title="Add to Wishlist"
                    >
                      ♡
                    </button>
                  </div>
                  <div className="book-details">
                    <h3><Link to={`/book/${book._id || book.id}`}>{book.title}</Link></h3>
                    <p className="author">by {book.author}</p>
                    <p className="price">₹{book.price}</p>
                    <button className="add-cart-btn" onClick={() => addToCart(book)}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;