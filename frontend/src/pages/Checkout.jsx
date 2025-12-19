import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { cartItems = [], total = 0 } = location.state || {}
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Order placed successfully!')
    navigate('/')
  }

  if (!cartItems.length) {
    navigate('/cart')
    return null
  }

  return (
    <div className="checkout-container">
      <h1 className="cart-title">Checkout</h1>
      
      <div className="checkout-grid">
        <div className="checkout-section">
          <h2 className="section-title">Billing Information</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
            
            <h3 className="section-title" style={{fontSize: '18px', marginTop: '24px'}}>Payment Information</h3>
            
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
                className="form-input"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                  className="form-input"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="checkout-btn"
            >
              Place Order - ${total.toFixed(2)}
            </button>
          </form>
        </div>
        
        <div className="checkout-section">
          <h2 className="section-title">Order Summary</h2>
          
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="checkout-item">
                <img 
                  src={item.cover} 
                  alt={item.title}
                  className="checkout-item-image"
                />
                <div className="checkout-item-details">
                  <h4 className="checkout-item-title">{item.title}</h4>
                  <p className="checkout-item-author">{item.author}</p>
                  <p className="checkout-item-price">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{borderTop: '1px solid #eee', marginTop: '24px', paddingTop: '16px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold'}}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout