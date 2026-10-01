import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'
import { wasteTypeOptions } from '../../data/mockData'
import { useAppData } from '../../context/AppDataContext'

export default function CreatePickup() {
  const [form, setForm] = useState({
    wasteType: 'Plastic',
    quantity: '',
    address: '',
    preferredDate: '',
    notes: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { addPickup } = useAppData()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.quantity.trim() || !form.address.trim() || !form.preferredDate) {
      setError('Quantity, address, and preferred date are required.')
      return
    }
    if (new Date(form.preferredDate) < new Date(new Date().toISOString().slice(0, 10))) {
      setError('Preferred date cannot be in the past.')
      return
    }
    setLoading(true)
    window.setTimeout(() => { const pickup = addPickup(form); setLoading(false); setSuccess('Pickup request created successfully.'); window.setTimeout(() => navigate(`/citizen/pickups/${pickup.id}`), 400) }, 450)
  }
  const reset = () => { setForm({ wasteType: 'Plastic', quantity: '', address: '', preferredDate: '', notes: '' }); setError(''); setSuccess('') }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Request a waste pickup</h2>

      <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
        <Select label="Waste type" id="wasteType" name="wasteType" value={form.wasteType} onChange={handleChange} options={wasteTypeOptions.map((option) => ({ value: option, label: option }))} />
        <Input label="Approximate quantity" id="quantity" name="quantity" value={form.quantity} onChange={handleChange} placeholder="2 bins" />
        <div className="md:col-span-2">
          <Input label="Address" id="address" name="address" value={form.address} onChange={handleChange} placeholder="House 12, Road 4, Sylhet" />
        </div>
        <Input label="Preferred date" id="preferredDate" name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} />
        <div className="md:col-span-2">
          <Textarea label="Notes" id="notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Any instructions or access notes for the visiting vendor." />
        </div>
        <div className="md:col-span-2">
          {error && <p className="mb-3 text-sm text-rose-600">{error}</p>}
          {success && <p className="mb-3 text-sm text-emerald-700">{success}</p>}
          <div className="flex flex-wrap gap-3"><Button type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Submit request'}</Button><button type="button" onClick={reset} disabled={loading} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700">Reset</button><button type="button" onClick={() => navigate('/citizen/pickups')} disabled={loading} className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600">Cancel</button></div>
        </div>
      </form>
    </div>
  )
}
