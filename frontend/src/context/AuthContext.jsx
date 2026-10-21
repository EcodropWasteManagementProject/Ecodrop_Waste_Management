import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'ecodrop.auth'

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expiresAt, setExpiresAt] = useState(null)
  const [authError, setAuthError] = useState('')

  const establishSession = (authResponse) => {
    const sessionExpiresAt = Date.now() + authResponse.expires_in * 1000
    sessionStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ accessToken: authResponse.access_token, expiresAt: sessionExpiresAt }),
    )
    setUser(authResponse.user)
    setToken(authResponse.access_token)
    setExpiresAt(sessionExpiresAt)
    setAuthError('')
    return { success: true, user: authResponse.user }
  }

  const clearSession = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
    setToken(null)
    setExpiresAt(null)
  }

  useEffect(() => {
    let isMounted = true

    const restoreSession = async () => {
      try {
        const stored = sessionStorage.getItem(AUTH_STORAGE_KEY)
        if (!stored) {
          return
        }

        const session = JSON.parse(stored)
        if (
          typeof session.accessToken !== 'string'
          || typeof session.expiresAt !== 'number'
          || session.expiresAt <= Date.now()
        ) {
          clearSession()
          return
        }

        const currentUser = await authService.getCurrentUser(session.accessToken)
        if (isMounted) {
          setUser(currentUser)
          setToken(session.accessToken)
          setExpiresAt(session.expiresAt)
        }
      } catch (error) {
        if (isMounted) {
          clearSession()
          setAuthError(error.message || 'Your session could not be verified. Please log in again.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    restoreSession()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const handleExpiredSession = () => {
      clearSession()
      setAuthError('Your session has expired. Please log in again.')
      navigate('/login', { replace: true })
    }

    window.addEventListener('ecodrop:auth-expired', handleExpiredSession)
    return () => window.removeEventListener('ecodrop:auth-expired', handleExpiredSession)
  }, [navigate])

  useEffect(() => {
    if (!expiresAt) {
      return undefined
    }

    const timeout = window.setTimeout(() => {
      clearSession()
      navigate('/login', { replace: true })
    }, Math.max(0, expiresAt - Date.now()))

    return () => window.clearTimeout(timeout)
  }, [expiresAt, navigate])

  const login = async (email, password) => establishSession(await authService.login(email, password))
  const register = async (values) => establishSession(await authService.register(values))

  const logout = () => {
    clearSession()
    setAuthError('')
  }

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      register,
      logout,
      isLoading,
      authError,
      isAuthenticated: Boolean(user),
    }),
    [user, token, isLoading, authError],
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
