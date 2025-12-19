import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Cart({ cart, removeFromCart, user, setUser }) {
  const total = cart.reduce((sum, book) => sum + Number(book.price), 0);

  return (
    <div>
      <Navbar cart={cart} wishlist={[]} user={user} setUser={setUser} />
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h3>No Product</h3>
            <p>Go find the products you like</p>
            <Link to="/home" className="continue-btn">Continue Shopping</Link>
          </div>
        ) : (
          <>
            {cart.map(book => (
              <div key={book._id || book.id} className="cart-item">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <p>₹{book.price}</p>
                <button onClick={() => removeFromCart(book._id || book.id)}>Remove</button>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total: ₹{total.toFixed(0)}</h3>
              <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;