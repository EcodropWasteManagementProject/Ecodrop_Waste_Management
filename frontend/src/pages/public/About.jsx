import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">About EcoDrop</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">A digital bridge between communities and cleaner cities.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            EcoDrop is designed to make responsible waste handling easier for everyone. Citizens can quickly report waste issues,
            request collection, and learn how to sort and recycle properly. Vendors can accept and manage pickups, while admins can
            coordinate activity across the system.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 p-5">
              <h2 className="text-xl font-semibold text-slate-900">Community-first</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The platform makes it easier to communicate waste problems and coordinate the right response locally.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <h2 className="text-xl font-semibold text-slate-900">Data-driven</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Reporting, status tracking, and dashboards surface actionable insights for faster cleanup and better decisions.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
