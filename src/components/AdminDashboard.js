import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard({ user, setUser }) {
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, totalBooks: 0 });
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '', author: '', price: '', category: '', image: '', description: ''
  });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStats();
    fetchBooks();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats');
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      const data = await response.json();
      const allBooks = Object.values(data).flat();
      setBooks(allBooks);
    } catch (err) {
      console.error('Failed to fetch books');
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...newBook, price: Number(newBook.price) })
      });
      
      if (response.ok) {
        setNewBook({ title: '', author: '', price: '', category: '', image: '', description: '' });
        setShowAddForm(false);
        fetchBooks();
        fetchStats();
      }
    } catch (err) {
      alert('Failed to add book');
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Delete this book?')) {
      try {
        await fetch(`/api/admin/books/${bookId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchBooks();
        fetchStats();
      } catch (err) {
        alert('Failed to delete book');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹{stats.totalRevenue}</p>
        </div>
        <div className="stat-card">
          <h3>Total Books</h3>
          <p>{stats.totalBooks}</p>
        </div>
      </div>

      <div className="books-section">
        <div className="section-header">
          <h2>Manage Books</h2>
          <button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add Book'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddBook} className="add-book-form">
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({...newBook, title: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({...newBook, author: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newBook.price}
              onChange={(e) => setNewBook({...newBook, price: e.target.value})}
              required
            />
            <select
              value={newBook.category}
              onChange={(e) => setNewBook({...newBook, category: e.target.value})}
              required
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Romance">Romance</option>
              <option value="Dystopian">Dystopian</option>
            </select>
            <input
              type="url"
              placeholder="Image URL"
              value={newBook.image}
              onChange={(e) => setNewBook({...newBook, image: e.target.value})}
              required
            />
            <textarea
              placeholder="Description"
              value={newBook.description}
              onChange={(e) => setNewBook({...newBook, description: e.target.value})}
              required
            />
            <button type="submit">Add Book</button>
          </form>
        )}

        <div className="books-list">
          {books.map(book => (
            <div key={book._id} className="book-item">
              <img src={book.image} alt={book.title} />
              <div className="book-info">
                <h4>{book.title}</h4>
                <p>by {book.author}</p>
                <p>₹{book.price} - {book.category}</p>
              </div>
              <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;