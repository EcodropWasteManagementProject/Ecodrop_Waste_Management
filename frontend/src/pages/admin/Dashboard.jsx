import { Link } from 'react-router-dom'
import StatusBadge from '../../components/common/StatusBadge'
import { mockAnalytics, mockDashboardStats, mockReports, mockVendorList } from '../../data/mockData'

const stats = mockDashboardStats.admin

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Waste category distribution</h3>
          <div className="mt-5 space-y-4">
            {mockAnalytics.reportsByType.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex justify-between text-sm text-slate-600">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Recent reports</h3>
          <div className="mt-5 space-y-4">
            {mockReports.slice(0, 3).map((report) => (
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
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">Vendor workload</h3>
          <Link to="/admin/vendors" className="text-sm font-medium text-emerald-700">View all</Link>
        </div>
        <div className="space-y-4">
          {mockVendorList.map((vendor) => (
            <div key={vendor.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-900">{vendor.name}</p>
                <p className="text-sm text-slate-500">{vendor.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{vendor.workload} tasks</p>
                <StatusBadge status={vendor.status} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
