import { useAuth } from '../../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Vendor profile</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Business name</p><p className="mt-2 font-medium text-slate-900">EcoCycle Logistics</p></div>
        <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Primary contact</p><p className="mt-2 font-medium text-slate-900">{user?.name}</p></div>
        <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Email</p><p className="mt-2 font-medium text-slate-900">{user?.email}</p></div>
        <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Service area</p><p className="mt-2 font-medium text-slate-900">Sylhet</p></div>
      </div>
    </div>
  )
}
