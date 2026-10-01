import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import { useAppData } from '../../context/AppDataContext'
import { useState } from 'react'

export default function Reports() {
  const { reports } = useAppData()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const visible = reports.filter((report) => `${report.title} ${report.location}`.toLowerCase().includes(query.toLowerCase()) && (!status || report.status === status))
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Waste Reports</h2>
        <Link to="/citizen/reports/new">
          <Button>New report</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row"><input aria-label="Search reports" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search reports..." className="rounded-xl border border-slate-200 px-4 py-2" /><select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-2"><option value="">All statuses</option><option>PENDING</option><option>ASSIGNED</option><option>IN_PROGRESS</option><option>RESOLVED</option></select></div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">ID</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Title</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Type</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Location</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Priority</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {visible.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">#{report.id}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{report.title}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{report.wasteType}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{report.location}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{report.priority}</td>
                <td className="px-4 py-3"><StatusBadge status={report.status} /></td>
                <td className="px-4 py-3">
                  <Link to={`/citizen/reports/${report.id}`} className="text-sm font-medium text-emerald-700">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
