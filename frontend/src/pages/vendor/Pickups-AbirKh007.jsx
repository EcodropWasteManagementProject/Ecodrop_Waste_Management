import { Link } from 'react-router-dom'
import StatusBadge from '../../components/common/StatusBadge'
import { useAppData } from '../../context/AppDataContext'
import { useState } from 'react'

export default function Pickups() {
  const { pickups, advancePickup } = useAppData()
  const [query, setQuery] = useState('')
  const visible = pickups.filter((item) => `${item.address} ${item.wasteType}`.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Pickup requests</h2>
        <input aria-label="Search pickups" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pickups..." className="mt-4 rounded-xl border border-slate-200 px-4 py-2" />
        <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">ID</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Waste</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Location</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Date</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {visible.map((pickup) => (
                <tr key={pickup.id}>
                  <td className="px-4 py-3 text-sm text-slate-700">#{pickup.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">{pickup.wasteType}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{pickup.address}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{pickup.preferredDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={pickup.status} /></td>
                  <td className="px-4 py-3">
                    {pickup.status !== 'COMPLETED' && <button onClick={() => advancePickup(pickup.id)} className="mr-3 text-sm font-medium text-emerald-700">Advance</button>}
                    <Link to={`/vendor/pickups/${pickup.id}`} className="text-sm font-medium text-emerald-700">Manage</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
