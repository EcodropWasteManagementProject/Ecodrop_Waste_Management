import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../../components/common/StatusBadge'
import { mockPickups } from '../../data/mockData'

export default function PickupDetails() {
  const { id } = useParams()
  const pickup = mockPickups.find((item) => String(item.id) === String(id)) || mockPickups[0]

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
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Address</p><p className="mt-2 font-medium text-slate-900">{pickup.address}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Preferred date</p><p className="mt-2 font-medium text-slate-900">{pickup.preferredDate}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Quantity</p><p className="mt-2 font-medium text-slate-900">{pickup.quantity}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Notes</p><p className="mt-2 font-medium text-slate-900">{pickup.notes}</p></div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Vendor actions</h3>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white">Accept</button>
          <button className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Mark picked up</button>
          <button className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Mark completed</button>
        </div>
      </div>

      <Link to="/vendor/pickups" className="text-sm font-medium text-emerald-700">Back to requests</Link>
    </div>
  )
}
