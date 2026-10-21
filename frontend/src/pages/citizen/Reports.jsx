import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../components/common/ErrorMessage'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import useCitizenReports from '../../hooks/useCitizenReports'

const statusOptions = ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED']

export default function Reports() {
  const { reports, isLoading, error, reload } = useCitizenReports()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const visibleReports = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return reports.filter((report) => {
      const matchesStatus = !status || report.status === status
      const matchesSearch = !normalizedSearch || [
        report.id,
        report.title,
        report.wasteType,
        report.location,
      ].some((value) => String(value).toLowerCase().includes(normalizedSearch))
      return matchesStatus && matchesSearch
    })
  }, [reports, search, status])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Waste Reports</h2>
        <Link to="/citizen/reports/new">
          <Button>New report</Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Search reports"
          id="report-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search title, type, location, or ID"
        />
        <Select
          label="Filter by status"
          id="report-status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={[
            { value: '', label: 'All statuses' },
            ...statusOptions.map((item) => ({ value: item, label: item.replaceAll('_', ' ') })),
          ]}
        />
      </div>

      {error && (
        <div className="space-y-3">
          <ErrorMessage message={error} />
          <Button variant="secondary" onClick={reload}>Retry</Button>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">ID</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Title</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Type</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Location</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Priority</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Created</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {isLoading && (
              <tr><td className="px-4 py-8 text-center text-sm text-slate-500" colSpan="8">Loading your reports...</td></tr>
            )}
            {!isLoading && !error && visibleReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-700">#{report.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">{report.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{report.wasteType}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{report.location}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{report.priority}</td>
                  <td className="px-4 py-3"><StatusBadge status={report.status} /></td>
                  <td className="px-4 py-3 text-sm text-slate-700">{new Date(report.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Link to={`/citizen/reports/${report.id}`} className="text-sm font-medium text-emerald-700">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            {!isLoading && !error && visibleReports.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-sm text-slate-500" colSpan="8">
                  {reports.length ? 'No reports match your search and filters.' : 'You have not submitted any reports yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
