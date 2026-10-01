import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import ErrorMessage from '../../components/common/ErrorMessage'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useAuth } from '../../context/AuthContext'

const roleOptions = [
  { value: 'CITIZEN', label: 'Citizen' },
  { value: 'VENDOR', label: 'Vendor' },
  { value: 'ADMIN', label: 'Admin' },
]

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    role: 'CITIZEN',
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
      navigate('/citizen/dashboard')
    } catch (submitError) {
      setError(submitError.message || 'Registration failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Create account</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900">Join EcoDrop</h1>
          </div>

          <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="md:col-span-2">
              <Input label="Full name" id="fullName" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Jane Doe" />
            </div>
            <Input label="Email" id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            <Select label="Role" id="role" name="role" value={form.role} onChange={handleChange} options={roleOptions} />
            <Input label="Password" id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimum 8 characters" />
            <Input label="Confirm password" id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" />
            <Input label="Phone (optional)" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+8801700..." />
            <Input label="Address (optional)" id="address" name="address" value={form.address} onChange={handleChange} placeholder="Your current address" className="md:col-span-2" />

            <div className="md:col-span-2">
              <ErrorMessage message={error} />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
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
        </div>
      </main>
      <Footer />
    </div>
  )
}
