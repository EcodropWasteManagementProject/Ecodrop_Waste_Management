import { apiRequest } from './apiClient'

function normalizeUser(user) {
  return { ...user, name: user.full_name }
}

export const authService = {
  async login(email, password) {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    return { ...response, user: normalizeUser(response.user) }
  },

  async register(values) {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: {
        full_name: values.fullName,
        email: values.email,
        password: values.password,
        phone: values.phone || null,
        address: values.address || null,
      },
    })
    return { ...response, user: normalizeUser(response.user) }
  },

  async getCurrentUser(token) {
    const user = await apiRequest('/auth/me', { token, authenticated: true })
    return normalizeUser(user)
  },
}
