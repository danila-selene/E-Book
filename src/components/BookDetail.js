import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';

function BookDetail({ addToCart, addToWishlist, user, setUser, cart, wishlist }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error('Failed to fetch book:', err);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <Navbar cart={cart} wishlist={wishlist} user={user} setUser={setUser} />
      <div className="book-detail-container">
        <Link to="/home" className="back-link">← Back to Home</Link>
        <div className="book-detail">
          <img src={book.image} alt={book.title} className="book-detail-cover" />
          <div className="book-info">
            <h1>{book.title}</h1>
            <h2>by {book.author}</h2>
            <p className="description">{book.description}</p>
            <p className="price">₹{book.price}</p>
            <div className="book-actions">
              <button onClick={() => addToCart(book)} className="add-to-cart-btn">
                Add to Cart
              </button>
              <button onClick={() => addToWishlist(book)} className="wishlist-detail-btn">
                ♡ Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;