import { mockAnalytics } from '../../data/mockData'

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Reports by waste type</h2>
          <div className="mt-5 space-y-4">
            {mockAnalytics.reportsByType.map((entry) => (
              <div key={entry.name}>
                <div className="mb-1 flex justify-between text-sm text-slate-600">
                  <span>{entry.name}</span>
                  <span>{entry.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${entry.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Monthly activity</h2>
          <div className="mt-6 flex items-end gap-3">
            {mockAnalytics.monthlyActivity.map((entry) => (
              <div key={entry.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-emerald-500" style={{ height: `${entry.value * 1.2}px` }} />
                <span className="text-xs text-slate-500">{entry.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Reports by status</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {mockAnalytics.reportsByStatus.map((entry) => (
            <div key={entry.name} className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{entry.name}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{entry.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
