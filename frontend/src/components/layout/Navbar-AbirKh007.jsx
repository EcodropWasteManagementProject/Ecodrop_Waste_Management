import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'
import Logo from '../common/Logo'

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/recycling-guide', label: 'Recycling Guide' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {publicLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-emerald-700' : 'text-slate-600 hover:text-slate-900'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to={user.role === 'ADMIN' ? '/admin/dashboard' : user.role === 'VENDOR' ? '/vendor/dashboard' : '/citizen/dashboard'} className="hidden text-sm font-medium text-slate-700 md:inline-flex">
                Dashboard
              </Link>
              <Button variant="secondary" onClick={handleLogout} className="px-3 py-2 text-sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden text-sm font-medium text-slate-700 md:inline-flex">
                Login
              </Link>
              <Link to="/register">
                <Button className="px-4 py-2 text-sm">Create account</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
