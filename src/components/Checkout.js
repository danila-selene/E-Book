import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Checkout({ cart, setCart, user, setUser }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((sum, book) => sum + Number(book.price), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cardNumber && expiryDate && cvv) {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // JWT
          },
          body: JSON.stringify({
            items: cart,
            total,
            payment: { cardNumber, expiryDate, cvv }
          })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Order placed successfully!');
          setCart([]);
          navigate('/home');
        } else {
          alert(data.error || 'Failed to place order');
        }
      } catch (err) {
        console.error('Checkout error:', err);
        alert('Server error while placing order');
      }
    }
  };

  return (
    <div>
      <Navbar cart={cart} wishlist={[]} user={user} setUser={setUser} />
      <div className="checkout-container">
        <h2>Checkout</h2>
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cart.map((book, index) => (
            <div key={book._id || index} className="checkout-item">
              <span>{book.title}</span>
              <span>₹{book.price}</span>
            </div>
          ))}
          <div className="total">Total: ₹{total.toFixed(0)}</div>
        </div>
        <form onSubmit={handleSubmit} className="payment-form">
          <h3>Payment Information</h3>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;