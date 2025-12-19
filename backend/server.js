const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Order = require('./models/Order');
const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// In-memory fallback
// Books data
const books = {
  "Fiction": [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 799, image: "https://covers.openlibrary.org/b/id/8225261-M.jpg", description: "A classic American novel about the Jazz Age and the American Dream." },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 1099, image: "https://covers.openlibrary.org/b/id/8228691-M.jpg", description: "A gripping tale of racial injustice and childhood innocence in the American South." },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 899, image: "https://covers.openlibrary.org/b/id/8231258-M.jpg", description: "A coming-of-age story following Holden Caulfield's journey through New York City." }
  ],
  "Dystopian": [
    { id: 3, title: "1984", author: "George Orwell", price: 999, image: "https://covers.openlibrary.org/b/id/7222246-M.jpg", description: "A chilling vision of a totalitarian future where Big Brother watches everything." }
  ],
  "Romance": [
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 699, image: "https://covers.openlibrary.org/b/id/8091016-M.jpg", description: "A witty romance about Elizabeth Bennet and the proud Mr. Darcy." }
  ]
};

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/E-BOOK')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

app.use(cors());
app.use(express.json());

// Admin credentials
const ADMIN_EMAIL = 'admin@ebook.com';
const ADMIN_PASSWORD = 'admin123';

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    const booksByCategory = books.reduce((acc, book) => {
      if (!acc[book.category]) acc[book.category] = [];
      acc[book.category].push(book);
      return acc;
    }, {});
    res.json(booksByCategory);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/orders', auth, async (req, res) => {
  try {
    const { cart, total, payment } = req.body;
    const order = new Order({
      userId: req.user.id,
      items: cart,
      total,
      payment
    });
    await order.save();
    res.json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/orders', auth, async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(userOrders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ isAdmin: true, email }, SECRET_KEY);
    res.json({ token, user: { email, isAdmin: true } });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

const adminAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    if (!verified.isAdmin) return res.status(403).json({ error: 'Admin access required' });
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

app.post('/api/admin/books', adminAuth, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json({ message: 'Book added successfully', book });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/admin/books/:id', adminAuth, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/stats', adminAuth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalBooks = await Book.countDocuments();
    
    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalBooks
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});