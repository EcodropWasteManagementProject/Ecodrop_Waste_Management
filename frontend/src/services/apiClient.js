const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'
).replace(/\/$/, '')

export async function apiRequest(path, { method = 'GET', body, token, authenticated = false } = {}) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Unable to reach the EcoDrop API. Check that the backend is running.')
    }
    throw error
  }

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') ? await response.json() : null
  if (!response.ok) {
    if (authenticated && response.status === 401 && typeof window !== 'undefined') {
      window.dispatchEvent(new Event('ecodrop:auth-expired'))
    }

    const detail = payload?.detail
    const message = Array.isArray(detail)
      ? detail.map((item) => `${item.loc?.slice(1).join('.') || 'Request'}: ${item.msg}`).join(' ')
      : detail
    const error = new Error(message || 'The EcoDrop API could not complete the request.')
    error.status = response.status
    throw error
  }
  if (!payload) {
    throw new Error('The EcoDrop API returned an unexpected response.')
  }
  return payload
}
