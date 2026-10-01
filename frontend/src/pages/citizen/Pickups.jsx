import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import { mockPickups } from '../../data/mockData'

export default function Pickups() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Pickup Requests</h2>
        <Link to="/citizen/pickups/new">
          <Button>Request pickup</Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">ID</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Waste type</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Address</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Vendor</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {mockPickups.map((pickup) => (
              <tr key={pickup.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">#{pickup.id}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{pickup.wasteType}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{pickup.address}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{pickup.preferredDate}</td>
                <td className="px-4 py-3"><StatusBadge status={pickup.status} /></td>
                <td className="px-4 py-3 text-sm text-slate-700">{pickup.assignedVendor}</td>
                <td className="px-4 py-3">
                  <Link to={`/citizen/pickups/${pickup.id}`} className="text-sm font-medium text-emerald-700">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
