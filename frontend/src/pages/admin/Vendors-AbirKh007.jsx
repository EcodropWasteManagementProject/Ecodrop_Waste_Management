import StatusBadge from '../../components/common/StatusBadge'
import { useAppData } from '../../context/AppDataContext'
import { useState } from 'react'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import EmptyState from '../../components/common/EmptyState'

export default function Vendors() {
  const { vendors, updateVendorStatus } = useAppData()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [pendingVendor, setPendingVendor] = useState(null)
  const visible = vendors.filter((vendor) => `${vendor.name} ${vendor.location}`.toLowerCase().includes(query.toLowerCase()) && (!status || vendor.status === status))
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Vendors</h2>
      <div className="mt-4 flex flex-wrap gap-3"><input aria-label="Search vendors" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search vendors..." className="rounded-xl border border-slate-200 px-4 py-2" /><select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-2"><option value="">All statuses</option><option>APPROVED</option><option>PENDING</option><option>SUSPENDED</option></select></div>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
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
            {visible.map((vendor) => (
              <tr key={vendor.id}>
                <td className="px-4 py-3 text-sm text-slate-900">{vendor.name}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{vendor.location}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{vendor.workload}</td>
                <td className="px-4 py-3"><StatusBadge status={vendor.status} /> <button onClick={() => setPendingVendor(vendor)} className="ml-3 text-sm font-medium text-emerald-700">{vendor.status === 'APPROVED' ? 'Suspend' : 'Approve'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!visible.length && <EmptyState title="No vendors found" description="Try a different search or status filter." />}
      <ConfirmDialog isOpen={Boolean(pendingVendor)} title={pendingVendor?.status === 'APPROVED' ? 'Suspend vendor?' : 'Approve vendor?'} message="This mock vendor status will be updated immediately." onCancel={() => setPendingVendor(null)} onConfirm={() => { updateVendorStatus(pendingVendor.id); setPendingVendor(null) }} />
    </div>
  )
}
