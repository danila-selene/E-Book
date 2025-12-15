import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = (email, password) => {
    // Simple mock login
    setUser({ email, name: email.split('@')[0] })
    setIsLoggedIn(true)
    return true
  }

  const signup = (email, password, name) => {
    // Simple mock signup
    setUser({ email, name })
    setIsLoggedIn(true)
    return true
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}