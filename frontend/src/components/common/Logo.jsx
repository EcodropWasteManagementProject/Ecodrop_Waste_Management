import { Link } from 'react-router-dom'
import { assets } from '../../assets'

export default function Logo({ link = true, light = false }) {
  const content = (
    <>
      <img src={assets.logo} alt="EcoDrop logo" className="h-11 w-11 rounded-xl object-cover" />
      <span className={light ? 'text-white' : 'text-slate-900'}>Eco<span className="text-emerald-500">Drop</span></span>
    </>
  )
  return link ? <Link to="/" className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight">{content}</Link> : <span className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight">{content}</span>
}
