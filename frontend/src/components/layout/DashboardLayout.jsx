import { useAuth } from '../../context/AuthContext'
import Sidebar from './Sidebar'

export default function DashboardLayout({ role = 'CITIZEN', title, subTitle, children }) {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <Sidebar role={role} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">EcoDrop</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
              {subTitle && <p className="mt-1 text-sm text-slate-600">{subTitle}</p>}
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
              {user?.name || 'Guest User'} • {role}
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}
