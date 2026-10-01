import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Home } from '../pages/public/Home'
import About from '../pages/public/About'
import RecyclingGuide from '../pages/public/RecyclingGuide'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import CitizenDashboard from '../pages/citizen/Dashboard'
import CitizenReports from '../pages/citizen/Reports'
import CreateReport from '../pages/citizen/CreateReport'
import ReportDetails from '../pages/citizen/ReportDetails'
import CitizenPickups from '../pages/citizen/Pickups'
import CreatePickup from '../pages/citizen/CreatePickup'
import PickupDetails from '../pages/citizen/PickupDetails'
import AIAssistant from '../pages/citizen/AIAssistant'
import EcoPoints from '../pages/citizen/EcoPoints'
import Notifications from '../pages/citizen/Notifications'
import Profile from '../pages/citizen/Profile'
import VendorDashboard from '../pages/vendor/Dashboard'
import VendorPickups from '../pages/vendor/Pickups'
import VendorPickupDetails from '../pages/vendor/PickupDetails'
import VendorProfile from '../pages/vendor/Profile'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminUsers from '../pages/admin/Users'
import AdminVendors from '../pages/admin/Vendors'
import AdminReports from '../pages/admin/Reports'
import AdminPickups from '../pages/admin/Pickups'
import AdminAnalytics from '../pages/admin/Analytics'
import DashboardLayout from '../components/layout/DashboardLayout'

function ProtectedRoute({ children, role }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}

function PublicPage({ children }) {
  return <>{children}</>
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage><Home /></PublicPage>} />
      <Route path="/about" element={<PublicPage><About /></PublicPage>} />
      <Route path="/recycling-guide" element={<PublicPage><RecyclingGuide /></PublicPage>} />
      <Route path="/login" element={<PublicPage><Login /></PublicPage>} />
      <Route path="/register" element={<PublicPage><Register /></PublicPage>} />

      <Route path="/citizen/dashboard" element={<ProtectedRoute role="CITIZEN"><DashboardLayout role="CITIZEN" title="Citizen Dashboard" subTitle="Overview of your waste activity and updates."><CitizenDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/citizen/reports" element={<ProtectedRoute role="CITIZEN"><DashboardLayout role="CITIZEN" title="My Reports" subTitle="Track your waste reports and follow-up actions."><CitizenReports /></DashboardLayout></ProtectedRoute>} />
      <Route path="/citizen/reports/new" element={<ProtectedRoute role="CITIZEN"><DashboardLayout role="CITIZEN" title="Report Waste" subTitle="Share a new waste issue or disposal problem."><CreateReport /></DashboardLayout></ProtectedRoute>} />
      <Route path="/citizen/reports/:id" element={<ProtectedRoute role="CITIZEN"><DashboardLayout role="CITIZEN" title="Report Details" subTitle="Full report history and status information."><ReportDetails /></DashboardLayout></ProtectedRoute>} />
      <Route path="/citizen/pickups" element={<ProtectedRoute role="CITIZEN"><DashboardLayout role="CITIZEN" title="My Pickups" subTitle="See your scheduled waste pickups and vendor updates."><CitizenPickups /></DashboardLayout></ProtectedRoute>} />
      <Route path="/citizen/pickups/new" element={<ProtectedRoute role="CITIZEN"><DashboardLayout role="CITIZEN" title="Request Pickup" subTitle="Schedule a new waste collection request."><CreatePickup /></DashboardLayout></ProtectedRoute>} />
      <Route path="/citizen/pickups/:id" element={<ProtectedRoute role="CITIZEN"><DashboardLayout role="CITIZEN" title="Pickup Details" subTitle="Request details, status timeline, and vendor notes."><PickupDetails /></DashboardLayout></ProtectedRoute>} />
      <Route path="/citizen/ai" element={<ProtectedRoute role="CITIZEN"><DashboardLayout role="CITIZEN" title="AI Assistant" subTitle="Ask for practical waste sorting and recycling guidance."><AIAssistant /></DashboardLayout></ProtectedRoute>} />
      <Route path="/citizen/eco-points" element={<ProtectedRoute role="CITIZEN"><DashboardLayout role="CITIZEN" title="Eco Points" subTitle="Track your sustainability progress and rewards."><EcoPoints /></DashboardLayout></ProtectedRoute>} />
      <Route path="/citizen/notifications" element={<ProtectedRoute role="CITIZEN"><DashboardLayout role="CITIZEN" title="Notifications" subTitle="Important updates about reports, pickups, and eco points."><Notifications /></DashboardLayout></ProtectedRoute>} />
      <Route path="/citizen/profile" element={<ProtectedRoute role="CITIZEN"><DashboardLayout role="CITIZEN" title="Profile" subTitle="Update your citizen account details."><Profile /></DashboardLayout></ProtectedRoute>} />

      <Route path="/vendor/dashboard" element={<ProtectedRoute role="VENDOR"><DashboardLayout role="VENDOR" title="Vendor Dashboard" subTitle="Manage active pickup requests and service performance."><VendorDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/vendor/pickups" element={<ProtectedRoute role="VENDOR"><DashboardLayout role="VENDOR" title="Pickup Requests" subTitle="Review available and assigned pickup tasks."><VendorPickups /></DashboardLayout></ProtectedRoute>} />
      <Route path="/vendor/pickups/:id" element={<ProtectedRoute role="VENDOR"><DashboardLayout role="VENDOR" title="Pickup Details" subTitle="Vendor actions and request details."><VendorPickupDetails /></DashboardLayout></ProtectedRoute>} />
      <Route path="/vendor/profile" element={<ProtectedRoute role="VENDOR"><DashboardLayout role="VENDOR" title="Vendor Profile" subTitle="View your vendor information and service profile."><VendorProfile /></DashboardLayout></ProtectedRoute>} />

      <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><DashboardLayout role="ADMIN" title="Admin Dashboard" subTitle="Monitor system activity and operational metrics."><AdminDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute role="ADMIN"><DashboardLayout role="ADMIN" title="Users" subTitle="Manage citizen and operational accounts."><AdminUsers /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/vendors" element={<ProtectedRoute role="ADMIN"><DashboardLayout role="ADMIN" title="Vendors" subTitle="Approve and review vendors and their workload."><AdminVendors /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute role="ADMIN"><DashboardLayout role="ADMIN" title="Reports" subTitle="Review and manage waste reports across the system."><AdminReports /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/pickups" element={<ProtectedRoute role="ADMIN"><DashboardLayout role="ADMIN" title="Pickups" subTitle="Coordinate pickup requests and vendor assignments."><AdminPickups /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute role="ADMIN"><DashboardLayout role="ADMIN" title="Analytics" subTitle="Quick operational insights and activity summaries."><AdminAnalytics /></DashboardLayout></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
