import StatusBadge from '../../components/common/StatusBadge'
import { mockReports } from '../../data/mockData'

export default function Reports() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Reports</h2>
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">ID</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Title</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Type</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Priority</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {mockReports.map((report) => (
              <tr key={report.id}>
                <td className="px-4 py-3 text-sm text-slate-700">#{report.id}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{report.title}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{report.wasteType}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{report.priority}</td>
                <td className="px-4 py-3"><StatusBadge status={report.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
