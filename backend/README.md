# Ebook Backend API

## Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update MONGODB_URI in .env file
```bash
cd backend
npm install
npm run dev
```

## API Endpoints

### Auth
- `POST /api/register` - Register user
- `POST /api/login` - Login user

### Books
- `GET /api/books` - Get all books by category
- `GET /api/books/:id` - Get single book

### Orders
- `POST /api/orders` - Place order (auth required)
- `GET /api/orders` - Get user orders (auth required)

## Usage
Server runs on http://localhost:5000