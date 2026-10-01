import StatusBadge from '../../components/common/StatusBadge'
import { useAppData } from '../../context/AppDataContext'
import { useState } from 'react'

export default function Pickups() {
  const { pickups, vendors, advancePickup, assignPickup } = useAppData()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [vendor, setVendor] = useState('')
  const visible = pickups.filter((pickup) => `${pickup.address} ${pickup.wasteType}`.toLowerCase().includes(query.toLowerCase()) && (!status || pickup.status === status) && (!vendor || pickup.assignedVendor === vendor))
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Pickups</h2>
      <div className="mt-4 flex flex-wrap gap-3"><input aria-label="Search pickups" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pickups..." className="rounded-xl border border-slate-200 px-4 py-2" /><select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-2"><option value="">All statuses</option><option>PENDING</option><option>ASSIGNED</option><option>PICKED_UP</option><option>COMPLETED</option></select><select aria-label="Filter pickups by vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-2"><option value="">All vendors</option>{vendors.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></div>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
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
            {visible.map((pickup) => (
              <tr key={pickup.id}>
                <td className="px-4 py-3 text-sm text-slate-700">#{pickup.id}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{pickup.wasteType}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{pickup.address}</td>
                <td className="px-4 py-3"><select aria-label={`Assign pickup ${pickup.id}`} value={pickup.assignedVendor === 'Awaiting assignment' ? '' : pickup.assignedVendor} onChange={(e) => assignPickup(pickup.id, e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1 text-xs"><option value="">Unassigned</option>{vendors.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></td>
                <td className="px-4 py-3"><StatusBadge status={pickup.status} /> {pickup.status !== 'COMPLETED' && <button onClick={() => advancePickup(pickup.id)} className="ml-3 text-sm font-medium text-emerald-700">Advance</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
