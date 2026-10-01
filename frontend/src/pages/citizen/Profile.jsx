import { useAuth } from '../../context/AuthContext'
import Button from '../../components/common/Button'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Account details</h2>
        <div className="mt-5 space-y-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Full name</p>
            <p className="mt-1 font-medium text-slate-900">{user?.name}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-1 font-medium text-slate-900">{user?.email}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Phone</p>
            <p className="mt-1 font-medium text-slate-900">{user?.phone || 'Not provided'}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Address</p>
            <p className="mt-1 font-medium text-slate-900">{user?.address || 'Not provided'}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Settings</h2>
        <div className="mt-5 space-y-4 text-sm text-slate-600">
          <p>Notification preferences: Enabled</p>
          <p>Pickup reminders: Enabled</p>
          <p>Profile visibility: Public</p>
        </div>
        <div className="mt-6 flex gap-3">
          <Button variant="secondary">Edit profile</Button>
          <Button variant="ghost">Manage preferences</Button>
        </div>
      </div>
    </div>
  )
}
