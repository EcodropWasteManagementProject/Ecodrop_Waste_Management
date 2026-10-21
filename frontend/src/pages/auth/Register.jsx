import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import ErrorMessage from '../../components/common/ErrorMessage'
import Input from '../../components/common/Input'
import AuthPageLayout from '../../components/layout/AuthPageLayout'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const { register, isLoading } = useAuth()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.fullName || !form.email || !form.password) {
      setError('Please complete the required fields.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      await register(form)
      navigate('/citizen/dashboard', { replace: true })
    } catch (submitError) {
      setError(submitError.message || 'Registration failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageLayout
      eyebrow="Join the community"
      title="Be part of a cleaner future."
      description="Create your EcoDrop citizen account to report waste issues and follow the progress in your area."
    >
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Get started</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Create your account</h2>
        <p className="mt-2 text-sm text-slate-600">A few details are all you need to get started.</p>
      </div>

      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <Input label="Full name" id="fullName" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Jane Doe" autoComplete="name" required />
        <Input label="Email" id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required />
        <Input label="Password" id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimum 8 characters" autoComplete="new-password" minLength={8} required />
        <Input label="Confirm password" id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" autoComplete="new-password" minLength={8} required />
        <Input label="Phone (optional)" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+8801700..." autoComplete="tel" />
        <div className="sm:col-span-2">
          <Input label="Address (optional)" id="address" name="address" value={form.address} onChange={handleChange} placeholder="Your current address" autoComplete="street-address" />
        </div>

        <div className="sm:col-span-2"><ErrorMessage message={error} /></div>

        <div className="sm:col-span-2">
          <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-emerald-700">
          Login here
        </Link>
      </p>
    </AuthPageLayout>
  )
}
