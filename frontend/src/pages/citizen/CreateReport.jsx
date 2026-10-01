import { useState } from 'react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'
import { priorityOptions, wasteTypeOptions } from '../../data/mockData'

export default function CreateReport() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    wasteType: 'Plastic',
    location: '',
    priority: 'Medium',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Mock report created successfully. This is a frontend-only placeholder.')
  }

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
          <input type="file" className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 file:mr-4 file:rounded file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white" />
        </div>

        <div className="md:col-span-2">
          <Button type="submit" className="w-full sm:w-auto">Submit report</Button>
        </div>
      </form>
    </div>
  )
}
