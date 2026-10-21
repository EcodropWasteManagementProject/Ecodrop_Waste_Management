import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { assets } from '../../assets'

const projects = [
  {
    title: 'Community Waste Reporting',
    category: 'Cleaner neighborhoods',
    description: 'Help residents flag overflowing bins and illegal dumping so local waste issues are easier to coordinate.',
    image: assets.reportingFeature,
    imageAlt: 'Color-coded recycling bins lined up along an urban street',
    link: '/login',
    linkLabel: 'Report a waste issue',
  },
  {
    title: 'Neighborhood Cleanup',
    category: 'Community action',
    description: 'Bring neighbors together around cleaner shared spaces and make responsible disposal part of everyday life.',
    image: assets.community,
    imageAlt: 'Illustration of community members caring for their neighborhood',
    link: '/about',
    linkLabel: 'About EcoDrop',
  },
  {
    title: 'Recycling Education',
    category: 'Smarter sorting',
    description: 'Make it easier to understand how common materials can be sorted and disposed of responsibly.',
    image: assets.sorting,
    imageAlt: 'Illustration of containers for sorting recyclable materials',
    link: '/recycling-guide',
    linkLabel: 'Explore the recycling guide',
  },
  {
    title: 'Coordinated Pickup Services',
    category: 'Reliable collection',
    description: 'Connect pickup requests with collection teams and give residents a clearer view of service updates.',
    image: assets.pickup,
    imageAlt: 'Illustration of a waste collection vehicle',
    link: '/login',
    linkLabel: 'Request a pickup',
  },
  {
    title: 'Greener City Communities',
    category: 'Sustainable living',
    description: 'Support cleaner streets through practical tools that make community waste management easier to navigate.',
    image: assets.homepageImage,
    imageAlt: 'EcoDrop community members recycling and sorting waste in a greener city',
    link: '/about',
    linkLabel: 'Learn about EcoDrop',
  },
  {
    title: 'A Cleaner Urban Future',
    category: 'Environmental impact',
    description: 'Encourage better waste habits with a shared place to report issues, find guidance, and coordinate action.',
    image: assets.heroCity,
    imageAlt: 'Illustration of a clean green city with recycling bins',
    link: '/recycling-guide',
    linkLabel: 'Find recycling guidance',
  },
]

export default function Projects() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <section className="relative isolate overflow-hidden bg-emerald-700 text-white">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600" />
          <div className="absolute -bottom-20 -right-12 -z-10 h-72 w-72 rounded-full border-[36px] border-white/10 sm:right-12" />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <nav aria-label="Breadcrumb" className="text-sm text-emerald-100">
              <Link to="/" className="transition hover:text-white">Home</Link>
              <span className="px-2" aria-hidden="true">/</span>
              <span aria-current="page" className="font-medium text-white">Our Projects</span>
            </nav>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
              Cleaner communities, together
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Our Projects
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-emerald-50 sm:text-xl">
              Discover the community initiatives EcoDrop is designed to support—from better waste reporting to smarter recycling and coordinated pickups.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">What we work toward</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Practical ideas for a cleaner future.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Explore the ways EcoDrop can help people and collection teams work together on everyday waste challenges.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="overflow-hidden bg-emerald-50">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">{project.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{project.description}</p>
                  <Link
                    to={project.link}
                    className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
                  >
                    {project.linkLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm leading-6 text-emerald-900">
            These are illustrative project themes for the EcoDrop platform, not a live list of completed community projects or measured results.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
