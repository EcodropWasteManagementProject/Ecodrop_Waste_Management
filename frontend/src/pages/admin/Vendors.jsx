import StatusBadge from '../../components/common/StatusBadge'
import { mockVendorList } from '../../data/mockData'

export default function Vendors() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Vendors</h2>
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Vendor</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Location</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Workload</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {mockVendorList.map((vendor) => (
              <tr key={vendor.id}>
                <td className="px-4 py-3 text-sm text-slate-900">{vendor.name}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{vendor.location}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{vendor.workload}</td>
                <td className="px-4 py-3"><StatusBadge status={vendor.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
