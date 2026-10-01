import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { publicFactCards } from '../../data/mockData'

const steps = [
  'Create your account in a few seconds',
  'Report waste or request collection',
  'Track updates and receive recycling guidance',
]

export function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                Clean streets. Smarter recycling.
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Build a greener city with EcoDrop.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600">
                EcoDrop helps citizens report waste issues, request pickups, receive recycling advice,
                and track collective environmental impact in one smart platform.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/login">
                  <Button>Report Waste</Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary">Request Pickup</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-white shadow-xl">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-sm text-emerald-100">Active reports</p>
                  <p className="mt-3 text-3xl font-bold">2,480</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-sm text-emerald-100">Pickups completed</p>
                  <p className="mt-3 text-3xl font-bold">1,964</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm sm:col-span-2">
                  <p className="text-sm text-emerald-100">Eco impact</p>
                  <p className="mt-3 text-3xl font-bold">18.2 tons diverted</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Why EcoDrop</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">A cleaner city starts with smarter coordination.</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {publicFactCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-lg text-emerald-700">
                    ✓
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">How it works</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Simple steps for a cleaner community</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-lg font-medium text-slate-800">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">AI recycling support</p>
                <h2 className="mt-3 text-3xl font-bold">Ask the assistant about disposal and sorting.</h2>
              </div>
              <Link to="/login">
                <Button variant="secondary" className="bg-white text-slate-900 hover:bg-slate-200">
                  Ask AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
