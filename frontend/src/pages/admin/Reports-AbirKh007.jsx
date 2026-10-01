import StatusBadge from '../../components/common/StatusBadge'
import { useAppData } from '../../context/AppDataContext'
import { useState } from 'react'

export default function Reports() {
  const { reports, vendors, updateReport, assignReport } = useAppData()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [vendor, setVendor] = useState('')
  const visible = reports.filter((report) => `${report.title} ${report.location}`.toLowerCase().includes(query.toLowerCase()) && (!status || report.status === status) && (!vendor || report.assignedVendor === vendor))
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Reports</h2>
      <div className="mt-4 flex flex-wrap gap-3"><input aria-label="Search reports" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search reports..." className="rounded-xl border border-slate-200 px-4 py-2" /><select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-2"><option value="">All statuses</option><option>PENDING</option><option>ASSIGNED</option><option>IN_PROGRESS</option><option>RESOLVED</option></select><select aria-label="Filter reports by vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-2"><option value="">All vendors</option>{vendors.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></div>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">ID</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Title</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Type</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Priority</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Vendor</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {visible.map((report) => (
              <tr key={report.id}>
                <td className="px-4 py-3 text-sm text-slate-700">#{report.id}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{report.title}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{report.wasteType}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{report.priority}</td>
                <td className="px-4 py-3"><select aria-label={`Assign report ${report.id}`} value={report.assignedVendor === 'Awaiting assignment' ? '' : report.assignedVendor} onChange={(e) => assignReport(report.id, e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1 text-xs"><option value="">Unassigned</option>{vendors.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></td>
                <td className="px-4 py-3"><StatusBadge status={report.status} /> <select aria-label={`Update report ${report.id}`} value={report.status} onChange={(e) => updateReport(report.id, e.target.value)} className="ml-3 rounded-lg border border-slate-200 px-2 py-1 text-xs"><option>PENDING</option><option>ASSIGNED</option><option>IN_PROGRESS</option><option>RESOLVED</option></select></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
