import { apiRequest } from './apiClient'

function toReport(report) {
  return {
    ...report,
    wasteType: report.waste_type,
    assignedVendor: report.assigned_vendor || 'Awaiting assignment',
    createdAt: report.created_at,
    updatedAt: report.updated_at,
  }
}

export const reportService = {
  async createReport(values, token) {
    const report = await apiRequest('/reports', {
      method: 'POST',
      token,
      authenticated: true,
      body: {
        title: values.title,
        description: values.description,
        waste_type: values.wasteType,
        location: values.location,
        priority: values.priority,
      },
    })
    return toReport(report)
  },

  async getReports(token) {
    const reports = await apiRequest('/reports', { token, authenticated: true })
    return reports.map(toReport)
  },

  async getReport(id, token) {
    const report = await apiRequest(`/reports/${encodeURIComponent(id)}`, {
      token,
      authenticated: true,
    })
    return toReport(report)
  },
}
