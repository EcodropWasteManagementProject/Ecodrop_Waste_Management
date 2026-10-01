import { Link } from 'react-router-dom'
import Logo from '../common/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo link={false} light />
          <p className="mt-3 text-sm text-slate-300">
            Smart urban waste management and recycling support for citizens, vendors, and administrators.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/recycling-guide">Recycling Guide</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>hello@ecodrop.app</li>
            <li>+880 1700 000 000</li>
            <li>Sylhet, Bangladesh</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
