import { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Fiction', 'Self-Help', 'Science Fiction', 'Business', 'Biography', 'Thriller', 'Historical Fiction', 'Fantasy']

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 9.99, category: "Fiction", cover: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/67f0e0d4-217a-40fd-a8b6-166cc4e82a3a.png" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, category: "Fiction", cover: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/7c88eeea-a911-44c8-80ec-52db8d6761d9.png" },
  { id: 3, title: "1984", author: "George Orwell", price: 11.99, category: "Science Fiction", cover: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/c3f4be04-7824-48b3-8c59-2f3b31c69180.png" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 8.99, category: "Fiction", cover: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/6a9041aa-d57a-4827-b8a3-50d2455376d1.png" },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 10.99, category: "Fiction", cover: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/1810475c-40bd-441c-96f1-ec6607c13721.png" },
  { id: 6, title: "Lord of the Flies", author: "William Golding", price: 9.49, category: "Fiction", cover: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/8bda6d00-435d-4fdd-902e-d0ec14460efa.png" },
  { id: 7, title: "Dune", author: "Frank Herbert", price: 13.99, category: "Science Fiction", cover: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/8396e32e-7d4f-40d1-81d4-daefb42c71f3.png" },
  { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien", price: 11.49, category: "Fantasy", cover: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/aa25667e-dd63-4aff-92e8-16eba01f9a49.png" }
];


  const filteredBooks = activeCategory === 'All' ? books : books.filter(book => book.category === activeCategory)

  const addToCart = (book) => {
    const existingItem = cart.find(item => item.id === book.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...book, quantity: 1 }])
    }
  }

  return (
    <div className="kindle-container">
      <div>
        <h1 className="kindle-title">E-Books</h1>
        <p className="kindle-subtitle">Discover your next great read from our collection</p>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="kindle-book-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="kindle-book-card">
            <img 
              src={book.cover} 
              alt={book.title}
              className="kindle-book-image"
            />
            <div className="kindle-book-info">
              <h3 className="kindle-book-title">{book.title}</h3>
              <p className="kindle-book-author">{book.author}</p>
              <div className="kindle-book-price">${book.price}</div>
              <button 
                onClick={() => addToCart(book)}
                className="kindle-add-btn"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <Link 
          to="/cart" 
          state={{ cart }}
          className="cart-float"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </Link>
      )}
    </div>
  )
}

export default Home