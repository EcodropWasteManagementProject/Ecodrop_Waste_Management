import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import ErrorMessage from '../../components/common/ErrorMessage'
import Input from '../../components/common/Input'
import AuthPageLayout from '../../components/layout/AuthPageLayout'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login, authError, isLoading } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const result = await login(form.email, form.password)
      navigate(`/${result.user.role.toLowerCase()}/dashboard`, { replace: true })
    } catch (submitError) {
      setError(submitError.message || 'Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageLayout
      eyebrow="Welcome back"
      title="Small actions. Cleaner cities."
      description="Sign in to report waste, track collection, and help make your community a cleaner place."
    >
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">EcoDrop account</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Login to EcoDrop</h2>
        <p className="mt-2 text-sm text-slate-600">Welcome back. Enter your account details to continue.</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <ErrorMessage message={error || authError} />

        <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-emerald-700">
          Register here
        </Link>
      </p>
    </AuthPageLayout>
  )
}
