import { NavLink } from 'react-router-dom'

const menuByRole = {
  CITIZEN: [
    { to: '/citizen/dashboard', label: 'Dashboard' },
    { to: '/citizen/reports', label: 'My Reports' },
    { to: '/citizen/reports/new', label: 'Report Waste' },
    { to: '/citizen/pickups', label: 'My Pickups' },
    { to: '/citizen/pickups/new', label: 'Request Pickup' },
    { to: '/citizen/ai', label: 'AI Assistant' },
    { to: '/citizen/eco-points', label: 'Eco Points' },
    { to: '/citizen/notifications', label: 'Notifications' },
    { to: '/citizen/profile', label: 'Profile' },
  ],
  VENDOR: [
    { to: '/vendor/dashboard', label: 'Dashboard' },
    { to: '/vendor/pickups', label: 'Pickup Requests' },
    { to: '/vendor/profile', label: 'Profile' },
  ],
  ADMIN: [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/vendors', label: 'Vendors' },
    { to: '/admin/reports', label: 'Reports' },
    { to: '/admin/pickups', label: 'Pickups' },
    { to: '/admin/analytics', label: 'Analytics' },
  ],
}

export default function Sidebar({ role = 'CITIZEN' }) {
  const links = menuByRole[role] || menuByRole.CITIZEN

  return (
    <aside className="w-full border-b border-slate-200 bg-white lg:max-w-[260px] lg:border-b-0 lg:border-r">
      <div className="p-4 sm:p-5">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Role</p>
          <h2 className="mt-2 text-xl font-bold text-slate-900">{role}</h2>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block shrink-0 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
