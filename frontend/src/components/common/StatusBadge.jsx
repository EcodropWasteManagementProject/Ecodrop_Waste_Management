export default function StatusBadge({ status }) {
  const tone = {
    PENDING: 'bg-amber-100 text-amber-800',
    ASSIGNED: 'bg-sky-100 text-sky-800',
    IN_PROGRESS: 'bg-indigo-100 text-indigo-800',
    RESOLVED: 'bg-emerald-100 text-emerald-800',
    REJECTED: 'bg-rose-100 text-rose-800',
    PICKED_UP: 'bg-cyan-100 text-cyan-800',
    COMPLETED: 'bg-emerald-100 text-emerald-800',
    CANCELLED: 'bg-slate-200 text-slate-700',
    APPROVED: 'bg-emerald-100 text-emerald-800',
    PENDING_REVIEW: 'bg-yellow-100 text-yellow-800',
  }

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone[status] || 'bg-slate-200 text-slate-700'}`}>
      {status}
    </span>
  )
}
