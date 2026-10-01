import { createContext, useContext, useMemo, useState } from 'react'
import { mockNotifications, mockPickups, mockReports, mockUsers, mockVendorList } from '../data/mockData'

const AppDataContext = createContext(null)
const nextStatus = { PENDING: 'ASSIGNED', ASSIGNED: 'PICKED_UP', PICKED_UP: 'COMPLETED' }

export function AppDataProvider({ children }) {
  const [reports, setReports] = useState(mockReports)
  const [pickups, setPickups] = useState(mockPickups)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [users, setUsers] = useState(mockUsers)
  const [vendors, setVendors] = useState(mockVendorList)

  const addReport = (values) => {
    const report = { ...values, id: Date.now(), status: 'PENDING', createdAt: new Date().toISOString().slice(0, 10), assignedVendor: 'Awaiting assignment' }
    setReports((items) => [report, ...items])
    setNotifications((items) => [{ id: Date.now(), title: 'Report submitted', message: `${report.title} is now being reviewed.`, date: report.createdAt, read: false }, ...items])
    return report
  }
  const addPickup = (values) => {
    const pickup = { ...values, id: Date.now(), status: 'PENDING', assignedVendor: 'Awaiting assignment' }
    setPickups((items) => [pickup, ...items])
    setNotifications((items) => [{ id: Date.now(), title: 'Pickup request received', message: 'We will assign a vendor shortly.', date: new Date().toISOString().slice(0, 10), read: false }, ...items])
    return pickup
  }
  const advancePickup = (id) => setPickups((items) => items.map((item) => item.id === id ? { ...item, status: nextStatus[item.status] || item.status, assignedVendor: item.status === 'PENDING' ? 'EcoCycle Logistics' : item.assignedVendor } : item))
  const updateReport = (id, status) => setReports((items) => items.map((item) => item.id === id ? { ...item, status } : item))
  const assignReport = (id, vendor) => setReports((items) => items.map((item) => item.id === id ? { ...item, assignedVendor: vendor || 'Awaiting assignment', status: vendor && item.status === 'PENDING' ? 'ASSIGNED' : item.status } : item))
  const assignPickup = (id, vendor) => setPickups((items) => items.map((item) => item.id === id ? { ...item, assignedVendor: vendor || 'Awaiting assignment', status: vendor && item.status === 'PENDING' ? 'ASSIGNED' : item.status } : item))
  const cancelPickup = (id) => setPickups((items) => items.map((item) => item.id === id && ['PENDING', 'ASSIGNED'].includes(item.status) ? { ...item, status: 'CANCELLED' } : item))
  const updateUserStatus = (id) => setUsers((items) => items.map((item) => item.id === id ? { ...item, status: item.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : item))
  const updateVendorStatus = (id) => setVendors((items) => items.map((item) => item.id === id ? { ...item, status: item.status === 'APPROVED' ? 'SUSPENDED' : 'APPROVED' } : item))
  const markRead = (id) => setNotifications((items) => items.map((item) => item.id === id ? { ...item, read: true } : item))
  const markAllRead = () => setNotifications((items) => items.map((item) => ({ ...item, read: true })))
  const value = useMemo(() => ({ reports, pickups, notifications, users, vendors, addReport, addPickup, cancelPickup, advancePickup, updateReport, assignReport, assignPickup, updateUserStatus, updateVendorStatus, markRead, markAllRead, unreadCount: notifications.filter((item) => !item.read).length }), [reports, pickups, notifications, users, vendors])
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const context = useContext(AppDataContext)
  if (!context) throw new Error('useAppData must be used inside AppDataProvider')
  return context
}
