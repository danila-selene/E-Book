import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const BookDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cart, setCart] = useState([])

  const books = {
    1: { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 9.99, category: "Fiction", cover: "https://via.placeholder.com/300x400/4A5568/FFFFFF?text=The+Great+Gatsby", description: "A classic American novel set in the summer of 1922, following the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.", rating: 4.2, pages: 180, published: "1925" },
    2: { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, category: "Fiction", cover: "https://via.placeholder.com/300x400/2D3748/FFFFFF?text=To+Kill+a+Mockingbird", description: "A gripping tale of racial injustice and childhood innocence in the American South during the 1930s.", rating: 4.5, pages: 324, published: "1960" },
    3: { id: 3, title: "1984", author: "George Orwell", price: 11.99, category: "Science Fiction", cover: "https://via.placeholder.com/300x400/1A202C/FFFFFF?text=1984", description: "A dystopian social science fiction novel about totalitarian control and surveillance in a future society.", rating: 4.4, pages: 328, published: "1949" }
  }

  const book = books[id]

  if (!book) {
    return <div className="kindle-container">Book not found</div>
  }

  const addToCart = () => {
    setCart([...cart, { ...book, quantity: 1 }])
    navigate('/cart', { state: { cart: [...cart, { ...book, quantity: 1 }] } })
  }

  return (
    <div className="kindle-container">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      
      <div className="book-detail-grid">
        <div className="book-detail-image">
          <img src={book.cover} alt={book.title} />
        </div>
        
        <div className="book-detail-info">
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-detail-author">by {book.author}</p>
          
          <div className="book-detail-meta">
            <span className="book-rating">★ {book.rating}</span>
            <span className="book-pages">{book.pages} pages</span>
            <span className="book-published">Published {book.published}</span>
          </div>
          
          <div className="book-detail-price">${book.price}</div>
          
          <button onClick={addToCart} className="book-detail-btn">
            Add to Cart
          </button>
          
          <div className="book-detail-description">
            <h3>About this book</h3>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetail