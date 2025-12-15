import { Outlet, Link } from "react-router-dom"
import { useAuth } from './contexts/AuthContext'
import './App.css'

function App() {
  const { isLoggedIn, user, logout } = useAuth()

  return (
    <>
      <header className="kindle-header">
        <div className="kindle-header-container">
          <div className="kindle-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff9900">
              <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
            </svg>
            <Link to="/" className="kindle-logo-text">E-Book Store</Link>
          </div>
          <nav className="kindle-nav">
            <Link to="/" className="kindle-nav-link active">Store</Link>
            <Link to="/cart" className="kindle-nav-cart">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              </svg>
            </Link>
            {isLoggedIn ? (
              <>
                <div className="kindle-user">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                  <span>{user?.email}</span>
                </div>
                <button onClick={logout} className="kindle-signout">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path d="m15.854 8.354-3 3a.5.5 0 0 1-.708-.708L14.293 8.5H5.5a.5.5 0 0 1 0-1h8.793l-2.147-2.146a.5.5 0 0 1 .708-.708l3 3a.5.5 0 0 1 0 .708z"/>
                  </svg>
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="kindle-nav-link">Sign In</Link>
            )}
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet/>
      </main>
    </>
  )
}

export default App