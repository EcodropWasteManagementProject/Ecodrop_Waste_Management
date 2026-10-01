import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    const normalizedEmail = String(email || '').trim().toLowerCase()
    const fallbackUser = {
      id: 1,
      name: 'Ayesha Rahman',
      email: 'citizen@ecodrop.com',
      role: normalizedEmail.includes('vendor') ? 'VENDOR' : normalizedEmail.includes('admin') ? 'ADMIN' : 'CITIZEN',
      phone: '+8801700000001',
      address: 'Sylhet, Bangladesh',
    }

    if (!normalizedEmail || !password) {
      throw new Error('Please provide your email and password.')
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(fallbackUser)
        resolve({ success: true, user: fallbackUser })
      }, 300)
    })
  }

  const register = async (values) => {
    const role = values.role || 'CITIZEN'
    const createdUser = {
      id: Date.now(),
      name: values.fullName,
      email: values.email,
      role,
      phone: values.phone || '',
      address: values.address || '',
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(createdUser)
        resolve({ success: true, user: createdUser })
      }, 300)
    })
  }

  const logout = () => {
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, login, register, logout, isAuthenticated: Boolean(user) }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
