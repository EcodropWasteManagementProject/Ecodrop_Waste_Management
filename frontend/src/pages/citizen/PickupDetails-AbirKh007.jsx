import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../../components/common/StatusBadge'
import EmptyState from '../../components/common/EmptyState'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import Button from '../../components/common/Button'
import { useState } from 'react'
import { useAppData } from '../../context/AppDataContext'

export default function PickupDetails() {
  const { id } = useParams()
  const { pickups, cancelPickup } = useAppData()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const pickup = pickups.find((item) => String(item.id) === String(id))
  if (!pickup) return <EmptyState title="Pickup not found" description="This pickup may have been removed or the link is invalid." />

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Pickup #{pickup.id}</p>
            <h2 className="text-2xl font-bold text-slate-900">{pickup.wasteType} collection</h2>
          </div>
          <StatusBadge status={pickup.status} />
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Address</p>
            <p className="mt-2 font-medium text-slate-900">{pickup.address}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Preferred date</p>
            <p className="mt-2 font-medium text-slate-900">{pickup.preferredDate}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Assigned vendor</p>
            <p className="mt-2 font-medium text-slate-900">{pickup.assignedVendor}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Quantity</p>
            <p className="mt-2 font-medium text-slate-900">{pickup.quantity}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Notes</p>
          <p className="mt-2 text-slate-700">{pickup.notes}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Status timeline</h3>
        <div className="mt-5 space-y-4">
          {['PENDING', 'ASSIGNED', 'PICKED_UP', 'COMPLETED'].map((status, index) => (
            <div key={status} className="flex items-center gap-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${index <= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-slate-800">{status}</p>
                <p className="text-sm text-slate-500">{index === 0 ? 'Requested by citizen' : 'Updated by collection team'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to="/citizen/pickups" className="text-sm font-medium text-emerald-700">Back to pickups</Link>
      {['PENDING', 'ASSIGNED'].includes(pickup.status) && (
        <Button variant="secondary" onClick={() => setConfirmOpen(true)}>Cancel pickup</Button>
      )}
      <ConfirmDialog isOpen={confirmOpen} title="Cancel pickup?" message="This request will be marked as cancelled." onCancel={() => setConfirmOpen(false)} onConfirm={() => { cancelPickup(pickup.id); setConfirmOpen(false) }} />
    </div>
  )
}
