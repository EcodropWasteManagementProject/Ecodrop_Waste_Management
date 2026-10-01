import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'
import { priorityOptions, wasteTypeOptions } from '../../data/mockData'
import { useAppData } from '../../context/AppDataContext'

export default function CreateReport() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    wasteType: 'Plastic',
    location: '',
    priority: 'Medium',
  })
  const [error, setError] = useState('')
  const [photo, setPhoto] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { addReport } = useAppData()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim() || form.description.trim().length < 10 || !form.location.trim()) {
      setError('Add a title, a description of at least 10 characters, and a location.')
      return
    }
    setLoading(true)
    window.setTimeout(() => { const report = addReport({ ...form, photo }); setLoading(false); setSuccess('Report submitted successfully.'); window.setTimeout(() => navigate(`/citizen/reports/${report.id}`), 400) }, 450)
  }
  const reset = () => { setForm({ title: '', description: '', wasteType: 'Plastic', location: '', priority: 'Medium' }); setPhoto(''); setError(''); setSuccess('') }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Submit a waste report</h2>

      <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="md:col-span-2">
          <Input label="Title" id="title" name="title" value={form.title} onChange={handleChange} placeholder="Overflowing bin near the market" />
        </div>

        <div className="md:col-span-2">
          <Textarea label="Description" id="description" name="description" value={form.description} onChange={handleChange} placeholder="Describe the waste issue and any relevant details." />
        </div>

        <Select label="Waste type" id="wasteType" name="wasteType" value={form.wasteType} onChange={handleChange} options={wasteTypeOptions.map((option) => ({ value: option, label: option }))} />
        <Input label="Location" id="location" name="location" value={form.location} onChange={handleChange} placeholder="Sylhet Sadar" />
        <Select label="Priority" id="priority" name="priority" value={form.priority} onChange={handleChange} options={priorityOptions.map((option) => ({ value: option, label: option }))} />
        <div className="self-end">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Photo</label>
          <input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) setPhoto(URL.createObjectURL(file)) }} className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 file:mr-4 file:rounded file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white" />
          {photo && <img src={photo} alt="Report preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />}
        </div>

        <div className="md:col-span-2">
          {error && <p className="mb-3 text-sm text-rose-600">{error}</p>}
          {success && <p className="mb-3 text-sm text-emerald-700">{success}</p>}
          <div className="flex flex-wrap gap-3"><Button type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Submit report'}</Button><button type="button" onClick={reset} disabled={loading} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700">Reset</button><button type="button" onClick={() => navigate('/citizen/reports')} disabled={loading} className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600">Cancel</button></div>
        </div>
      </form>
    </div>
  )
}
