import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../../components/common/StatusBadge'
import { mockReports } from '../../data/mockData'

export default function ReportDetails() {
  const { id } = useParams()
  const report = mockReports.find((item) => String(item.id) === String(id)) || mockReports[0]

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Report #{report.id}</p>
            <h2 className="text-2xl font-bold text-slate-900">{report.title}</h2>
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
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Description</p>
          <p className="mt-2 text-slate-700">{report.description}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Status timeline</h3>
        <div className="mt-5 space-y-4">
          {['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'].map((status, index) => (
            <div key={status} className="flex items-center gap-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${index <= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-slate-800">{status}</p>
                <p className="text-sm text-slate-500">{index === 0 ? 'Submitted by citizen' : 'Updated by system'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to="/citizen/reports" className="text-sm font-medium text-emerald-700">Back to reports</Link>
    </div>
  )
}
