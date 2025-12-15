import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Cart = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(location.state?.cart || [])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id))
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const proceedToCheckout = () => {
    navigate('/checkout', { state: { cartItems, total } })
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
          <h2>Your cart is empty</h2>
          <p>Add some books to get started</p>
          <Link to="/" className="checkout-btn">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img 
              src={item.cover} 
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-author">{item.author}</p>
              <p className="cart-item-price">${item.price}</p>
            </div>
            <div className="cart-controls">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="quantity-btn"
              >
                -
              </button>
              <span style={{width: '32px', textAlign: 'center'}}>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
              <button 
                onClick={() => removeItem(item.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h2 className="summary-title">Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="summary-total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button 
          onClick={proceedToCheckout}
          className="checkout-btn"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart