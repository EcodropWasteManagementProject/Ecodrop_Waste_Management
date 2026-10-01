import { Link } from 'react-router-dom'
import StatusBadge from '../../components/common/StatusBadge'
import { mockDashboardStats, mockPickups } from '../../data/mockData'

const stats = mockDashboardStats.vendor

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Recent activity</h2>
          <Link to="/vendor/pickups" className="text-sm font-medium text-emerald-700">Manage pickups</Link>
        </div>

        <div className="space-y-4">
          {mockPickups.map((pickup) => (
            <div key={pickup.id} className="flex flex-col justify-between gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-medium text-slate-900">Pickup #{pickup.id}</p>
                <p className="text-sm text-slate-500">{pickup.address} • {pickup.wasteType}</p>
              </div>
              <StatusBadge status={pickup.status} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
