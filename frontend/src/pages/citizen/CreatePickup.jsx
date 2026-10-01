import { useState } from 'react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'
import { wasteTypeOptions } from '../../data/mockData'

export default function CreatePickup() {
  const [form, setForm] = useState({
    wasteType: 'Plastic',
    quantity: '',
    address: '',
    preferredDate: '',
    notes: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Mock pickup request created successfully. This is a frontend-only placeholder.')
  }

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
          <Button type="submit" className="w-full sm:w-auto">Submit request</Button>
        </div>
      </form>
    </div>
  )
}
