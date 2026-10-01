import { mockNotifications } from '../../data/mockData'

export default function Notifications() {
  return (
    <div className="space-y-4">
      {mockNotifications.map((notification) => (
        <div key={notification.id} className={`rounded-2xl border p-5 shadow-sm ${notification.read ? 'border-slate-200 bg-white' : 'border-emerald-200 bg-emerald-50'}`}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-900">{notification.title}</h3>
            {!notification.read && <span className="rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">New</span>}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{notification.message}</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{notification.date}</p>
        </div>
      ))}
    </div>
  )
}
