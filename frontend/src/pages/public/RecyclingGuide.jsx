import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { recyclingGuide } from '../../data/mockData'

export default function RecyclingGuide() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Recycling Guide</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">Sort smarter and dispose responsibly.</h1>
          <p className="mt-3 text-slate-600">Local collection rules may vary, so always check with your municipality or local collection service.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {recyclingGuide.map((item) => (
            <div key={item.type} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{item.type}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.tips}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
