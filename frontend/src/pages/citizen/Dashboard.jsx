import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import ErrorMessage from '../../components/common/ErrorMessage'
import StatusBadge from '../../components/common/StatusBadge'
import useCitizenReports from '../../hooks/useCitizenReports'
import { mockDashboardStats, mockNotifications, mockPickups } from '../../data/mockData'

const stats = mockDashboardStats.citizen

export default function Dashboard() {
  const { reports, isLoading, error, reload } = useCitizenReports()
  const reportStats = (label) => {
    if (isLoading) return '...'
    if (error) return 'Unavailable'
    if (label === 'Total Reports') return reports.length
    if (label === 'Pending Reports') return reports.filter((report) => report.status === 'PENDING').length
    return null
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-4 text-3xl font-bold text-slate-900">
              {reportStats(item.label) ?? item.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Recent reports</h2>
            <Link to="/citizen/reports" className="text-sm font-medium text-emerald-700">View all</Link>
          </div>
          <div className="space-y-4">
            {error && (
              <div className="space-y-3">
                <ErrorMessage message={error} />
                <Button variant="secondary" onClick={reload}>Retry</Button>
              </div>
            )}
            {isLoading && <p className="text-sm text-slate-500">Loading your reports...</p>}
            {!isLoading && !error && reports.length === 0 && (
              <p className="text-sm text-slate-500">You have not submitted any reports yet.</p>
            )}
            {!isLoading && !error && reports.slice(0, 3).map((report) => (
              <div key={report.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900">{report.title}</p>
                    <p className="text-sm text-slate-500">{report.location}</p>
                  </div>
                  <StatusBadge status={report.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Recent pickups</h2>
            <Link to="/citizen/pickups" className="text-sm font-medium text-emerald-700">View all</Link>
          </div>
          <div className="space-y-4">
            {mockPickups.slice(0, 3).map((pickup) => (
              <div key={pickup.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900">Pickup #{pickup.id}</p>
                    <p className="text-sm text-slate-500">{pickup.wasteType} • {pickup.address}</p>
                  </div>
                  <StatusBadge status={pickup.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Recent notifications</h2>
          <Link to="/citizen/notifications" className="text-sm font-medium text-emerald-700">Open inbox</Link>
        </div>
        <div className="space-y-3">
          {mockNotifications.map((notification) => (
            <div key={notification.id} className={`rounded-xl p-4 ${notification.read ? 'bg-slate-50' : 'bg-emerald-50'}`}>
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-slate-900">{notification.title}</p>
                {!notification.read && <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />}
              </div>
              <p className="mt-1 text-sm text-slate-600">{notification.message}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
