import Navbar from './Navbar'
import Footer from './Footer'
import Logo from '../common/Logo'
import { assets } from '../../assets'

export default function AuthPageLayout({ eyebrow, title, description, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:min-h-[620px] lg:grid-cols-2">
          <section
            className="relative isolate flex min-h-[300px] items-end overflow-hidden bg-emerald-950 bg-cover bg-center p-7 text-white sm:min-h-[380px] sm:p-10 lg:min-h-full"
            style={{ backgroundImage: `url(${assets.homepageImage})` }}
            aria-label="EcoDrop introduction"
          >
            <video
              className="absolute inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden"
              src={assets.authBackgroundVideo}
              poster={assets.homepageImage}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              tabIndex={-1}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-emerald-950/20" />
            <div className="relative max-w-lg">
              <Logo link={false} light={true} />
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
                {eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-md text-base leading-7 text-white/85 sm:text-lg">
                {description}
              </p>
            </div>
          </section>

          <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-xl">{children}</div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
