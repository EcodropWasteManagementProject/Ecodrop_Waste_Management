import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import ErrorMessage from '../../components/common/ErrorMessage'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'
import { useAuth } from '../../context/AuthContext'
import { priorityOptions, wasteTypeOptions } from '../../data/mockData'
import { reportService } from '../../services/reportService'

export default function CreateReport() {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [form, setForm] = useState({
    title: '',
    description: '',
    wasteType: 'Plastic',
    location: '',
    priority: 'Medium',
  })
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [createdReport, setCreatedReport] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    return () => {
      if (photo?.previewUrl) URL.revokeObjectURL(photo.previewUrl)
    }
  }, [photo])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    setPhoto(file ? { file, previewUrl: URL.createObjectURL(file) } : null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setCreatedReport(null)

    if (!form.title.trim() || !form.description.trim() || !form.location.trim()) {
      setError('Complete the title, description, and location before submitting.')
      return
    }

    setIsSubmitting(true)
    try {
      const report = await reportService.createReport(form, token)
      setCreatedReport(report)
      setSuccess('Your report was submitted successfully.')
    } catch (submitError) {
      setError(submitError.message || 'The report could not be submitted.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Submit a waste report</h2>

      <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="md:col-span-2">
          <Input label="Title" id="title" name="title" value={form.title} onChange={handleChange} placeholder="Overflowing bin near the market" required maxLength={200} />
        </div>

        <div className="md:col-span-2">
          <Textarea label="Description" id="description" name="description" value={form.description} onChange={handleChange} placeholder="Describe the waste issue and any relevant details." required maxLength={10000} />
        </div>

        <Select label="Waste type" id="wasteType" name="wasteType" value={form.wasteType} onChange={handleChange} options={wasteTypeOptions.map((option) => ({ value: option, label: option }))} required />
        <Input label="Location" id="location" name="location" value={form.location} onChange={handleChange} placeholder="Sylhet Sadar" required maxLength={255} />
        <Select label="Priority" id="priority" name="priority" value={form.priority} onChange={handleChange} options={priorityOptions.map((option) => ({ value: option, label: option }))} required />
        <div className="self-end">
          <label htmlFor="report-photo" className="mb-1.5 block text-sm font-medium text-slate-700">Photo (preview only)</label>
          <input
            id="report-photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 file:mr-4 file:rounded file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
          />
          <p className="mt-1 text-xs text-slate-500">Images are not uploaded or saved with the report yet.</p>
          {photo?.previewUrl && <img src={photo.previewUrl} alt="Selected report preview" className="mt-3 max-h-48 rounded-xl object-cover" />}
        </div>

        <div className="space-y-3 md:col-span-2">
          <ErrorMessage message={error} />
          {success && (
            <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {success}
            </p>
          )}
          {createdReport && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(`/citizen/reports/${createdReport.id}`, {
                state: { success: 'Your report was submitted successfully.' },
              })}
            >
              View submitted report
            </Button>
          )}
        </div>

        <div className="md:col-span-2">
          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting report...' : 'Submit report'}
          </Button>
        </div>
      </form>
    </div>
  )
}
