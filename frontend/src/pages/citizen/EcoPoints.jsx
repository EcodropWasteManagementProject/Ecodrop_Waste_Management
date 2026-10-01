import { mockEcoPoints } from '../../data/mockData'

export default function EcoPoints() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-500 to-emerald-700 p-6 text-white shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">Current points</p>
        <h2 className="mt-3 text-4xl font-bold">{mockEcoPoints.current}</h2>
        <p className="mt-2 text-emerald-100">Level: {mockEcoPoints.level}</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">Points history</h3>
        <div className="mt-5 space-y-4">
          {mockEcoPoints.history.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="font-medium text-slate-900">{entry.title}</p>
                <p className="text-sm text-slate-500">{entry.date}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-sm font-semibold text-emerald-700">+{entry.points}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
