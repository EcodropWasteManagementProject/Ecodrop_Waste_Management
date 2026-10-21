import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Button from '../../components/common/Button'
import ErrorMessage from '../../components/common/ErrorMessage'
import StatusBadge from '../../components/common/StatusBadge'
import { useAuth } from '../../context/AuthContext'
import { reportService } from '../../services/reportService'

export default function ReportDetails() {
  const { id } = useParams()
  const { token } = useAuth()
  const location = useLocation()
  const [report, setReport] = useState(null)
  const [loadedId, setLoadedId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    reportService.getReport(id, token)
      .then((result) => {
        if (active) {
          setReport(result)
          setError('')
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message || 'This report could not be loaded.')
        }
      })
      .finally(() => {
        if (active) setLoadedId(id)
      })

    return () => {
      active = false
    }
  }, [id, token])

  const isLoading = loadedId !== id
  if (isLoading) {
    return <p className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">Loading report details...</p>
  }

  if (error || !report || String(report.id) !== id) {
    return (
      <div className="space-y-4">
        <ErrorMessage message={error || 'Report not found.'} />
        <Link to="/citizen/reports"><Button variant="secondary">Back to reports</Button></Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {location.state?.success && (
        <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {location.state.success}
        </p>
      )}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Report #{report.id}</p>
            <h2 className="text-2xl font-bold text-slate-900">{report.title}</h2>
            <p className="mt-1 text-sm text-slate-500">Submitted {new Date(report.createdAt).toLocaleString()}</p>
          </div>
          <StatusBadge status={report.status} />
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Waste type</p>
            <p className="mt-2 font-medium text-slate-900">{report.wasteType}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Location</p>
            <p className="mt-2 font-medium text-slate-900">{report.location}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Priority</p>
            <p className="mt-2 font-medium text-slate-900">{report.priority}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Assigned vendor</p>
            <p className="mt-2 font-medium text-slate-900">{report.assignedVendor}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Last updated</p>
            <p className="mt-2 font-medium text-slate-900">{new Date(report.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Description</p>
          <p className="mt-2 text-slate-700">{report.description}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Current status</h3>
        <div className="mt-4"><StatusBadge status={report.status} /></div>
        <p className="mt-3 text-sm text-slate-600">
          Status history is not recorded yet. This view shows the latest status and report timestamps.
        </p>
      </div>

      <Link to="/citizen/reports" className="text-sm font-medium text-emerald-700">Back to reports</Link>
    </div>
  )
}
