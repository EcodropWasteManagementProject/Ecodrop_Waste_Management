import StatusBadge from '../../components/common/StatusBadge'
import { mockPickups } from '../../data/mockData'

export default function Pickups() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Pickups</h2>
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">ID</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Waste</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Location</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Vendor</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {mockPickups.map((pickup) => (
              <tr key={pickup.id}>
                <td className="px-4 py-3 text-sm text-slate-700">#{pickup.id}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{pickup.wasteType}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{pickup.address}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{pickup.assignedVendor}</td>
                <td className="px-4 py-3"><StatusBadge status={pickup.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
